import { useToast } from '@/libs/toast';
import { useUpdateRole } from '@/queries/useRoleQuery';
import { Role } from '@/types/object.type';
import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';


interface Props {
    open: boolean;
    onCancel: () => void;
    currentRole: Role | null; // Dữ liệu Role hiện tại
}

export default function RoleUpdateModal({ open, onCancel, currentRole }: Props) {
    const [form] = Form.useForm();
    const toast = useToast();
    const { mutate: updateRole, isPending } = useUpdateRole();

    useEffect(() => {
        if (currentRole) {
            form.setFieldsValue(currentRole);
        } else {
            form.resetFields();
        }
    }, [currentRole, form]);

    const handleUpdate = (values: Role) => {
        if (!currentRole?._id) return;

        updateRole({ id: currentRole._id, payload: values }, {
            onSuccess: (res: any) => {
                toast.success(res?.message || 'Cập nhật Role thành công');
                onCancel();
            },
            onError: (error: any) => {
                const msg = error?.response?.data?.message || 'Cập nhật Role thất bại';
                toast.error(Array.isArray(msg) ? msg.join(', ') : msg);
            },
        });
    };

    return (
        <Modal
            title={`Sửa Role: ${currentRole?.name}`}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
                <Form.Item
                    name="name"
                    label="Tên Role"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={2} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className='bg-green' htmlType="submit" loading={isPending}>
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}