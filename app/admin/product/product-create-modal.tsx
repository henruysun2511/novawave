"use client"
import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
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
    const { uploadFile } = useUploadFile();

    const handleCreateProduct = async (values: any) => {
        let imgUrl = "";

        const file = values.img?.[0]?.originFileObj;
        if (file) {
            const res = await uploadFile(file);
            imgUrl = res.url;
        }

        const payload = {
            name: values.name,
            price: Number(values.price),
            stock: Number(values.stock),
            img: imgUrl,
        };

        mutate(payload, {
            onSuccess: (res) => {
                toast.success(res?.data?.message || "Thêm sản phẩm thành công");
                form.resetFields();
                onCancel();
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Lỗi");
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