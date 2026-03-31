"use client";
import TextEditor from "@/components/common/text-editor";
import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
import { useCreateNews } from "@/queries/useNewsQuery";
import { NewsStatus } from "@/types/constant.type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Upload } from "antd";

export default function NewsCreateModal({ open, onCancel }: { open: boolean; onCancel: () => void }) {
    const [form] = Form.useForm();
    const { mutate: createNews, isPending } = useCreateNews();
    const { uploadFile } = useUploadFile();
    const toast = useToast();

    // Xử lý upload ảnh cho TinyMCE (nếu chèn ảnh vào giữa nội dung)
    const handleImageUploadInEditor = async (file: File): Promise<string> => {
        try {
            const res = await uploadFile(file);
            return res.url;
        } catch (error) {
            toast.error("Upload ảnh trong nội dung thất bại");
            return "";
        }
    };

    const onFinish = async (values: any) => {
        try {
            let finalImageUrl = "";

            // Xử lý upload ảnh bìa (Thumbnail) nếu có
            if (values.imageFile && values.imageFile.length > 0) {
                const file = values.imageFile[0].originFileObj;
                const res = await uploadFile(file);
                finalImageUrl = res.url;
            }

            const payload = {
                title: values.title,
                status: values.status,
                content: values.content,
                imageUrl: finalImageUrl, // URL sau khi upload thành công
            };

            createNews(payload, {
                onSuccess: () => {
                    toast.success("Tạo tin tức thành công");
                    form.resetFields();
                    onCancel();
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
                }
            });
        } catch (error) {
            toast.error("Lỗi xử lý hình ảnh");
        }
    };

    return (
        <Modal
            title="Thêm tin tức"
            open={open}
            onCancel={onCancel}
            footer={null}
            width={1000}
            maskClosable={false}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={18}>
                        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
                            <Input placeholder="Nhập tiêu đề tin tức..." />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="status" label="Trạng thái" initialValue={NewsStatus.PUBLISHED}>
                            <Select options={[
                                { value: NewsStatus.DRAFT, label: "Bản nháp" },
                                { value: NewsStatus.PUBLISHED, label: "Xuất bản" },
                                { value: NewsStatus.ARCHIVED, label: "Đã lưu trữ" }
                            ]} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="imageFile"
                    label="Ảnh đại diện"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
                    rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện" }]}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false} // Không upload tự động
                        maxCount={1}
                        accept="image/*"
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item name="content" label="Nội dung">
                    <TextEditor
                        onImageUpload={handleImageUploadInEditor}
                        onChange={(content) => form.setFieldsValue({ content })}
                    />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onCancel}>Hủy</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        className="bg-green"
                    >
                        Lưu tin tức
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}