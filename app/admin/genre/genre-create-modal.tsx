"use client";

import { useToast } from "@/libs/toast";
import { useCreateGenre } from "@/queries/useGenreQuery";
import { Genre } from "@/types/object.type";
import { Button, Form, Input, Modal } from "antd";

export default function GenreCreateModal({ open, onCancel }: { open: boolean; onCancel: () => void }) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useCreateGenre();
    const toast = useToast();

    const handleCreate = (values: Genre) => {

        mutate(values, {
            onSuccess: (res) => {
                toast.success(res?.data?.message || "Thêm thành công");
                form.resetFields();
                onCancel();
            },
            onError: (error: any) =>
                toast.error(error?.response?.data?.message || "Lỗi"),
        });
    };

    return (
        <Modal open={open} onCancel={onCancel} footer={null} title="Thêm thể loại">
            <Form layout="vertical" form={form} onFinish={handleCreate}>
                <Form.Item name="name" label="Tên thể loại" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <div className="text-right">
                    <Button loading={isPending} htmlType="submit" type="primary" className="bg-green">
                        Thêm
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}