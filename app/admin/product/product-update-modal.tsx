import { useToast } from "@/libs/toast";
import { useUpdateProduct } from "@/queries/useProductQuery";
import { Product } from "@/types/object.type";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect } from "react";

export default function ProductUpdateModal({
    open,
    onCancel,
    data,
}: {
    open: boolean;
    onCancel: () => void;
    data: Product | null;
}) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useUpdateProduct();
    const toast = useToast();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,

                img: data.img
                    ? [
                        {
                            uid: "-1",
                            name: "image",
                            status: "done",
                            url: data.img,
                        },
                    ]
                    : [],
            });
        }
    }, [data]);

    const handleUpdate = (values: any) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("stock", values.stock);

        const newImg = values.img?.[0]?.originFileObj;
        if (newImg) {
            formData.append("img", newImg);
        } else if (data?.img && typeof data.img === 'string') {
            formData.append("img", data.img);
        }

        mutate(
            { id: data!._id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res?.data?.message || "Cập nhật sản phẩm thành công");
                    form.resetFields();
                    onCancel();
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Lỗi");
                },
            }
        );
    };

    return (
        <Modal open={open} onCancel={onCancel} title="Cập nhật sản phẩm" footer={null}>
            <Form layout="vertical" form={form} onFinish={handleUpdate}>

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
                    label="Ảnh"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        + Upload
                    </Upload>
                </Form.Item>

                <div className="text-right">
                    <Button loading={isPending} type="primary" className="bg-green" htmlType="submit">
                        Lưu thay đổi
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
