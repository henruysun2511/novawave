import Title from "@/components/ui/title";
import useDebounce from "@/libs/debounce";
import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
import { useAlbumListByArtist } from "@/queries/useAlbumQuery";
import { useArtistListAdmin, useArtistProfile } from "@/queries/useArtistQuery";
import { useGenreList } from "@/queries/useGenreQuery";
import { useCreateSong } from "@/queries/useSongQuery";
import { SongReleseStatus } from "@/types/constant.type";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, Switch, Upload } from "antd";
import { useState } from "react";

export default function ArtistSongUpload() {
    const [form] = Form.useForm();
    const toast = useToast();
    const { uploadFile , isUploading } = useUploadFile();
    const [explicit, setExplicit] = useState(false);
    const [releaseNow, setReleaseNow] = useState(true);
    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 400);

    const { data: artistSearch } = useArtistListAdmin({ name: debouncedSearch });

    const { mutate, isPending } = useCreateSong();

    const { data: artistUserData } = useArtistProfile();
    const { data: albumData } = useAlbumListByArtist(artistUserData?.data?._id ?? "");
    const { data: genreData } = useGenreList();


    const albumOptions = albumData?.data.map((a: any) => ({
        value: a._id,
        label: a.name
    }));

    const genreOptions = genreData?.data.map((g: any) => ({
        value: g.name,
        label: g.label
    }));


    const handleCreateSong = async (values: any) => {
        try {
            /* ===== IMAGE ===== */
            const imageFile: File | undefined =
                values.imageUrl?.[0]?.originFileObj;
            if (!imageFile) {
                toast.error("Thiếu ảnh bìa");
                return;
            }
            const { url: imageUrl } = await uploadFile(imageFile);

  
            const audioFile: File | undefined =
                values.mp3Link?.[0]?.originFileObj;
            if (!audioFile) {
                toast.error("Thiếu file audio");
                return;
            }
            const { url: mp3Url, duration } = await uploadFile(audioFile);

            const payload = {
                name: values.name,
                explicit,
                lyrics: explicit ? values.lyrics : undefined,
                genreNames: values.genreNames,
                albumId: values.albumId || null,
                featArtistIds: values.featArtistIds || [],
                releseStatus: releaseNow
                    ? SongReleseStatus.PUBLISHED
                    : SongReleseStatus.SCHEDULED,
                releaseAt: !releaseNow
                    ? values.releaseAt?.toISOString()
                    : null,
                imageUrl,
                mp3Link: mp3Url,
                duration, 
            };

            mutate(payload, {
                onSuccess: (res) => {
                    toast.success(
                        res?.data?.message || "Upload bài hát thành công!"
                    );
                    form.resetFields();
                },
                onError: (error: any) => {
                    const msg =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Có lỗi xảy ra";
                    toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                },
            });
        } catch {
            // lỗi upload đã được toast trong hook
        }
    };


    return (
        <>
            <Title>Upload track nhạc mới</Title>
            <div className="mb-8"></div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateSong}
            >
                <Row gutter={24}>
                    {/* LEFT SIDE */}
                    <Col span={8}>
                        <Form.Item
                            name="imageUrl"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                            label={<span className="text-white text-base">Ảnh bìa</span>}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false}
                                maxCount={1}
                                className="rounded-lg"
                            >
                                <div className="flex flex-col items-center justify-center text-white">
                                    <PlusOutlined className="text-2xl" />
                                    <span className="mt-2 text-sm">Tải ảnh lên</span>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="mp3Link"
                            label={<span className="text-white text-base">Audio</span>}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            rules={[{ required: true, message: "Vui lòng chọn audio" }]}
                        >
                            <Upload
                                accept="audio/*"
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Chọn audio</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

                    {/* RIGHT SIDE */}
                    <Col span={16}>
                        <Form.Item
                            label={<span className="text-white text-base">Tên bài hát</span>}
                            name="name"
                            rules={[{ required: true, message: "Tên bài hát không được để trống" }]}
                        >
                            <Input placeholder="Nhập tên bài hát..." />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-white text-base">Thể loại</span>}
                            name="genreNames"
                            rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}>
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Chọn thể loại"
                                options={genreOptions}
                            />
                        </Form.Item>

                        <Form.Item label={<span className="text-white text-base">Album</span>} name="albumId">
                            <Select
                                allowClear
                                placeholder="Chọn album"
                                options={albumOptions}
                            />
                        </Form.Item>

                        <Form.Item label={<span className="text-white text-base">Nghệ sĩ hợp tác</span>} name="featArtistIds">
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Tìm nghệ sĩ phụ..."
                                filterOption={false}
                                onSearch={(value) => setSearchText(value)}
                                options={(artistSearch?.data ?? []).map((a) => ({
                                    label: a.name,
                                    value: a._id
                                }))}
                            />
                        </Form.Item>

                        <Form.Item label={<span className="text-white text-base">Có lyrics</span>}>
                            <Switch checked={explicit} onChange={setExplicit} />
                        </Form.Item>

                        {explicit && (
                            <Form.Item label={<span className="text-white text-base">Lyrics</span>} name="lyrics">
                                <Input.TextArea rows={4} placeholder="Nhập lời bài hát..." />
                            </Form.Item>
                        )}

                        <Form.Item label={<span className="text-white text-base">Phát hành ngay</span>}>
                            <Switch checked={releaseNow} onChange={setReleaseNow} />
                        </Form.Item>

                        {!releaseNow && (
                            <Form.Item label={<span className="text-white text-base">Ngày phát hành</span>} name="releaseAt">
                                <DatePicker showTime />
                            </Form.Item>
                        )}

                        <Form.Item>
                            <div className="text-center mt-6">
                                <Button
                                    htmlType="submit"
                                    loading={isPending}
                                    type="primary"
                                    className="bg-green text-white font-bold rounded-lg px-6 py-3 hover:bg-green/90 transition"
                                >
                                    Upload track
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>


        </>
    )
}