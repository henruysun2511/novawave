import useDebounce from "@/libs/debounce";
import { useToast } from "@/libs/toast";
import { useAlbumListByArtist } from "@/queries/useAlbumQuery";
import { useArtistListAdmin, useArtistProfile } from "@/queries/useArtistQuery";
import { useGenreList } from "@/queries/useGenreQuery";
import { useSongDetail, useUpdateSong } from "@/queries/useSongQuery";
import { Song } from "@/types/object.type";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Switch,
    Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


interface Props {
    open: boolean;
    onCancel: () => void;
    song?: Song;
}

export default function ArtistSongUpdateModal({
    open,
    onCancel,
    song,
}: Props) {
    const [form] = Form.useForm();
    const toast = useToast();
    const [artistOptions, setArtistOptions] = useState<any[]>([]);

    const [explicit, setExplicit] = useState(false);
    const [releaseNow, setReleaseNow] = useState(true);
    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 400);

    //Lấy thông tin song
    const { data: songData } = useSongDetail(song?._id ?? "");
    console.log(songData)

    //Lấy danh sách artist
    const { data: artistSearch, isFetching } = useArtistListAdmin({ name: debouncedSearch });
    //Lấy thông tin của artist đang dùng
    const { data: artistUserData } = useArtistProfile();
    //Lấy danh sách album của artist
    const { data: albumData } = useAlbumListByArtist(artistUserData?.data?._id ?? "");
    //lấy danh sách thể loại
    const { data: genreData } = useGenreList();


    const albumOptions = albumData?.data.map((a: any) => ({
        value: a._id,
        label: a.name
    }));

    const genreOptions = genreData?.data.map((g: any) => ({
        value: g.name,
        label: g.label
    }));

    const { mutate, isPending } = useUpdateSong();


    useEffect(() => {
        if (!songData?.data || !open || !albumOptions?.length) return;

        const s = songData.data;

        setExplicit(!!s.lyrics);
        setReleaseNow(!s.releaseAt);


        const featOptions =
            s.featArtists?.map((a: any) => ({
                label: a.name,
                value: a._id,
            })) || [];

        setArtistOptions(featOptions);

        form.setFieldsValue({
            
            name: s.name,
            genreNames: s.genreNames || [],
            albumId: s.album?._id,
            featArtistIds: featOptions.map(o => o.value),
            lyrics: s.lyrics,
            releaseAt: s.releaseAt ? dayjs(s.releaseAt) : null,

            imageUrl: s.imageUrl
                ? [{
                    uid: "-1",
                    name: "image.jpg",
                    status: "done",
                    url: s.imageUrl,
                }]
                : [],

            mp3Link: s.mp3Link
                ? [{
                    uid: "-2",
                    name: "audio.mp3",
                    status: "done",
                    url: s.mp3Link,
                }]
                : [],
        });
    }, [songData, open]);

    const handleUpdateSong = (values: any) => {
        const formData = new FormData();

        formData.append("name", values.name);
        values.genreNames.forEach((g: string) =>
            formData.append("genreNames[]", g)
        );

        if (values.albumId) {
            formData.append("albumId", values.albumId);
        }

        values.featArtistIds?.forEach((id: string) =>
            formData.append("featArtistIds[]", id)
        );

        if (explicit && values.lyrics) {
            formData.append("lyrics", values.lyrics);
        }

        if (!releaseNow && values.releaseAt) {
            formData.append("releaseAt", values.releaseAt.toISOString());
        }

        const image = values.imageUrl?.[0];
        if (image?.originFileObj) {
            formData.append("image", image.originFileObj);
        }

        const audio = values.mp3Link?.[0];
        if (audio?.originFileObj) {
            formData.append("audio", audio.originFileObj);
        }

        mutate(
            { id: song?._id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res?.data.message || "Cập nhật bài hát thành công!");
                    form.resetFields();
                    onCancel();
                },
                onError: (error: any) => {
                    const msg =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Có lỗi xảy ra";
                    toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                },
            }
        );
    };

    return (
        <Modal open={open} onCancel={onCancel} footer={null} width={1200} title="Cập nhật bài hát">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateSong}
            >
                <Row gutter={24}>
                    {/* LEFT SIDE */}
                    <Col span={8}>
                        <Form.Item
                            name="imageUrl"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e?.fileList}
                            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>


                        <Form.Item
                            name="mp3Link"
                            label={<span className="text-black text-base">Audio</span>}
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
                            label={<span className="text-black text-base">Tên bài hát</span>}
                            name="name"
                            rules={[{ required: true, message: "Tên bài hát không được để trống" }]}
                        >
                            <Input placeholder="Nhập tên bài hát..." />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-black text-base">Thể loại</span>}
                            name="genreNames"
                            rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}>
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Chọn thể loại"
                                options={genreOptions}
                            />
                        </Form.Item>

                        <Form.Item label={<span className="text-black text-base">Album</span>} name="albumId">
                            <Select
                                allowClear
                                placeholder="Chọn album"
                                options={albumOptions}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nghệ sĩ hợp tác"
                            name="featArtistIds"
                        >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Tìm nghệ sĩ phụ..."
                                filterOption={false}
                                onSearch={setSearchText}
                                loading={isFetching}
                                options={[
                                    ...artistOptions,
                                    ...(artistSearch?.data ?? []).map(a => ({
                                        label: a.name,
                                        value: a._id,
                                    })),
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label="Có lyrics" name="explicit" valuePropName="checked">
                            <Switch onChange={setExplicit} />
                        </Form.Item>

                        {explicit && (
                            <Form.Item name="lyrics" label="Lyrics">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        )}

                        <Form.Item label={<span className="text-black text-base">Phát hành ngay</span>}>
                            <Switch checked={releaseNow} onChange={setReleaseNow} />
                        </Form.Item>

                        {!releaseNow && (
                            <Form.Item label={<span className="text-black text-base">Ngày phát hành</span>} name="releaseAt">
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
                                    Cập nhật track
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}