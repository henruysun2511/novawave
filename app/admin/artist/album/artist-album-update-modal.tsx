import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
import { useAlbumDetail, useUpdateAlbum } from "@/queries/useAlbumQuery"; // Giả định hook
import { Album } from "@/types/object.type";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Upload
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";



interface Props {
    open: boolean;
    onCancel: () => void;
    album?: Album;
}

export default function ArtistAlbumUpdateModal({
    open,
    onCancel,
    album,
}: Props) {
    const [form] = Form.useForm();
    const toast = useToast();
    const { uploadFile } = useUploadFile();
    // Lấy thông tin album chi tiết để populate
    const { data: albumData } = useAlbumDetail(album?._id ?? "");
    const currentAlbum = albumData?.data;

    const { mutate, isPending } = useUpdateAlbum();


    useEffect(() => {
        if (!currentAlbum || !open) return;

        const a = currentAlbum;

        form.setFieldsValue({
            name: a.name,
            // Set giá trị cho DatePicker
            release_date: a.release_date ? dayjs(a.release_date) : null,

            // Set giá trị cho Upload ảnh
            imageUrl: a.img
                ? [{
                    uid: "-1",
                    name: "image.jpg",
                    status: "done",
                    url: a.img,
                }]
                : [],
        });
    }, [currentAlbum, open]);

    const handleUpdateAlbum = async (values: any) => {
        try {
            let img: string | undefined;

            const imageFile: File | undefined =
                values.imageUrl?.[0]?.originFileObj;

            if (imageFile) {
                const res = await uploadFile(imageFile);
                img = res.url;
            }

            const payload = {
                name: values.name,
                img,
                release_date: values.release_date
                    ? values.release_date.toISOString()
                    : null,
            };

            mutate(
                { id: album?._id ?? "", data: payload },
                {
                    onSuccess: (res) => {
                        toast.success(
                            res?.data?.message || "Cập nhật album thành công!"
                        );
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
        } catch {
            // upload lỗi đã toast trong hook
        }
    };

    return (
        <Modal open={open} onCancel={onCancel} footer={null} width={800} title="Cập nhật Album">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateAlbum}
            >
                <Row gutter={24}>
                    {/* LEFT SIDE: COVER IMAGE */}
                    <Col span={8}>
                        <Form.Item
                            name="imageUrl"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e?.fileList}
                            rules={[{ required: true, message: "Vui lòng chọn ảnh bìa" }]}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload Cover</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>

                    {/* RIGHT SIDE: INFO */}
                    <Col span={16}>
                        <Form.Item
                            label={<span className="text-black text-base">Tên Album</span>}
                            name="name"
                            rules={[{ required: true, message: "Tên Album không được để trống" }]}
                        >
                            <Input placeholder="Nhập tên Album..." />
                        </Form.Item>



                        <Form.Item label={<span className="text-black text-base">Ngày phát hành</span>} name="release_date">
                            <DatePicker showTime={false} format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item>
                            <div className="text-center mt-6">
                                <Button
                                    htmlType="submit"
                                    loading={isPending}
                                    type="primary"
                                    className="bg-green text-white font-bold rounded-lg px-6 py-3 hover:bg-green/90 transition"
                                >
                                    Cập nhật Album
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}