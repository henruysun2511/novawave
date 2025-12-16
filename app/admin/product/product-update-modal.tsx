import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
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
    const { uploadFile } = useUploadFile();

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

    const handleUpdate = async (values: any) => {
        if (!data) {
            toast.error("Product data is null");
            return;
        }

        let imgUrl = data.img;

        const file = values.img?.[0]?.originFileObj;
        if (file) {
            const res = await uploadFile(file);
            imgUrl = res.url;
        }

        mutate(
            {
                id: data._id,
                data: {
                    name: values.name,
                    price: Number(values.price),
                    stock: Number(values.stock),
                    img: imgUrl,
                },
            },
            {
                onSuccess: () => {
                    toast.success("Cập nhật sản phẩm thành công");
                    onCancel();
                },
                onError: () => toast.error("Lỗi"),
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
