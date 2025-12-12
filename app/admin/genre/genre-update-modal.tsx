import { useToast } from "@/libs/toast";
import { useUpdateGenre } from "@/queries/useGenreQuery";
import { Genre } from "@/types/object.type";
import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";

export default function GenreUpdateModal({
    open,
    onCancel,
    data,
}: {
    open: boolean;
    onCancel: () => void;
    data: Genre | null;
}) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useUpdateGenre();
    const toast = useToast();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({ name: data.name });
        }
    }, [data]);

    const handleUpdate = (values: Genre) => {
        mutate(
            { id: data!._id, data: values },
            {
                onSuccess: (res) => {
                    toast.success(res?.data?.message || "Cập nhật thành công");
                    form.resetFields();
                    onCancel();
                },
                onError: (error: any) =>
                    toast.error(error?.response?.data?.message || "Lỗi"),
            }
        );
    };

    return (
        <Modal open={open} onCancel={onCancel} footer={null} title="Cập nhật thể loại">
            <Form layout="vertical" form={form} onFinish={handleUpdate}>
                <Form.Item label="Tên thể loại" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <div className="text-right">
                    <Button loading={isPending} type="primary" htmlType="submit" className="bg-green">
                        Lưu thay đổi
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}