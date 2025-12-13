import Title from "@/components/ui/title";
import useDebounce from "@/libs/debounce";
import { useToast } from "@/libs/toast";
import { useCreateAlbum } from "@/queries/useAlbumQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Switch, Upload } from "antd";
import { useState } from "react";

export default function ArtistAlbumCreate() {
    const [form] = Form.useForm();
    const toast = useToast();

    const [releaseNow, setReleaseNow] = useState(true);
    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 400);

    const { mutate, isPending } = useCreateAlbum();

    const handleCreateAlbum = (values: any) => {
        const formData = new FormData();

        formData.append("name", values.name);

        if (values.release_date) {
            formData.append("release_date", values.release_date);
        } 

        const imageFile = values.imageUrl?.[0]?.originFileObj;
        if (imageFile) {
            formData.append("img", imageFile);
        }

        mutate(formData, {
            onSuccess: (res: any) => {
                toast.success(res?.data?.message || "Tạo album thành công!");
                form.resetFields();
                setReleaseNow(true);
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Có lỗi xảy ra";

                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };

    return (
        <>
            <Title>Tạo album mới</Title>
            <div className="mb-8"></div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateAlbum}
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
                    </Col>

                    {/* RIGHT SIDE */}
                    <Col span={16}>
                        <Form.Item
                            label={<span className="text-white text-base">Tên album</span>}
                            name="name"
                            rules={[{ required: true, message: "Tên album không được để trống" }]}
                        >
                            <Input placeholder="Nhập tên album..." />
                        </Form.Item>


                        <Form.Item label={<span className="text-white text-base">Phát hành ngay</span>}>
                            <Switch checked={releaseNow} onChange={setReleaseNow} />
                        </Form.Item>

                        {!releaseNow && (
                            <Form.Item label={<span className="text-white text-base">Ngày phát hành</span>} name="release_date">
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
                                    Thêm album
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}