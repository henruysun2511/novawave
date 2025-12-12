"use client"
import { useToast } from "@/libs/toast";
import { useCreateProduct } from "@/queries/useProductQuery";
import { Button, Form, Input, Modal, Upload } from "antd";


export function ProductCreateModal({
    open,
    onCancel,
}: {
    open: boolean;
    onCancel: () => void;
}) {
    const [form] = Form.useForm();
    const toast = useToast();
    const { mutate, isPending } = useCreateProduct();

    const handleCreateProduct = (values: any) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("stock", values.stock);
        formData.append("price", values.price);

        const fileObj = values.img?.[0]?.originFileObj;
        if (fileObj) {
            formData.append("img", fileObj); 
        }

        mutate(formData, {
            onSuccess: (res) => {
                toast.success(res?.data?.message || "Thêm sản phẩm thành công");
                form.resetFields();
                onCancel();
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Lỗi");
            },
        });
    };

    return (
        <Modal open={open} onCancel={onCancel} footer={null} title="Thêm sản phẩm">
            <Form layout="vertical" form={form} onFinish={handleCreateProduct}>
                <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item name="stock" label="Kho" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    name="img"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <Button>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <div className="text-right">
                    <Button htmlType="submit" loading={isPending} type="primary" className="bg-green">
                        Thêm sản phẩm
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}