import { useToast } from "@/libs/toast";
import { useCreateAdvertisement } from "@/queries/useAdvertisementQuery";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";

export function AdvertisementCreateModal({ open, onCancel }: { open: boolean; onCancel: () => void }) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useCreateAdvertisement();
    const toast = useToast();

    const handleCreateAdvertisment = (values: any) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("partner", values.partner);

        const fileAudio = values.audio?.[0]?.originFileObj;
        if (fileAudio) {
            formData.append("audio", fileAudio);
        }
        const fileImage = values.banner?.[0]?.originFileObj;
        if (fileImage) {
            formData.append("banner", fileImage);
        }

        mutate(formData, {
            onSuccess: (res) => {
                form.resetFields();
                toast.success(res?.data.message || "Thêm thành công");
                onCancel();
            },
            onError: (error: any) => {
                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Có lỗi xảy ra";

                toast.error(
                    Array.isArray(message) ? message.join(", ") : message
                );
            },
        });
    };

    return (
        <>
            <Modal
                open={open}
                title="Thêm quảng cáo mới"
                onCancel={onCancel}
                footer={null}
                width={800}
            >
                <Form layout="vertical" form={form} onFinish={handleCreateAdvertisment}>
                    <Form.Item
                        name="title"
                        label="Tiêu đề quảng cáo"
                        rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                    >
                        <Input placeholder="Nhập tiêu đề..." />
                    </Form.Item>

                    <Form.Item
                        name="partner"
                        label="Đối tác"
                        rules={[{ required: true, message: "Vui lòng nhập đối tác" }]}
                    >
                        <Input placeholder="Nhập tên đối tác..." />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <TextArea placeholder="Nhập tên đối tác..." />
                    </Form.Item>

                    <Form.Item
                        name="audio"
                        label="Audio"
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

                    <Form.Item
                        name="banner"
                        label="Ảnh bìa"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                        rules={[{ required: true, message: "Vui lòng chọn ảnh bìa" }]}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            + Upload
                        </Upload>
                    </Form.Item>


                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="primary" loading={isPending} htmlType="submit" className="bg-green">Thêm quảng cáo</Button>
                    </Col>
                </Form>
            </Modal>
        </>
    )
}