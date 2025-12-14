import { useToast } from '@/libs/toast';
import { useCreateRole } from '@/queries/useRoleQuery';
import { Button, Form, Input, Modal } from 'antd';

interface Props {
    open: boolean;
    onCancel: () => void;
}

export default function RoleCreateModal({ open, onCancel }: Props) {
    const [form] = Form.useForm();
    const toast = useToast();
    const { mutate: createRole, isPending } = useCreateRole();

    const handleCreate = (values: any) => {
        createRole(values, {
            onSuccess: (res: any) => {
                toast.success(res?.message || 'Thêm Role thành công');
                form.resetFields();
                onCancel();
            },
            onError: (error: any) => {
                const msg = error?.response?.data?.message || 'Thêm Role thất bại';
                toast.error(Array.isArray(msg) ? msg.join(', ') : msg);
            },
        });
    };

    return (
        <Modal
            title="Thêm Role mới"
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleCreate}>
                <Form.Item
                    name="name"
                    label="Tên Role"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input placeholder="Ví dụ: Moderator" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={2} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className='bg-green' loading={isPending}>
                        Thêm Role
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}