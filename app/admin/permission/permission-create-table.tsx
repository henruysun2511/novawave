import { useToast } from '@/libs/toast';
import { useCreatePermission } from '@/queries/usePermissionQuery';
import { HttpMethod } from '@/types/constant.type';
import { Button, Form, Input, Modal, Select } from 'antd';

interface Props {
    open: boolean;
    onCancel: () => void;
}

export default function PermissionCreateModal({ open, onCancel }: Props) {
    const [form] = Form.useForm();
    const toast = useToast();

    // Hook mutation
    const { mutate: createPermission, isPending } = useCreatePermission();

    const handleCreate = (values: any) => {
        createPermission(values, {
            onSuccess: (res: any) => {
                toast.success(res?.message || 'Thêm Permission thành công');
                form.resetFields();
                onCancel();
            },
            onError: (error: any) => {
                const msg = error?.response?.data?.message || 'Thêm Permission thất bại';
                toast.error(Array.isArray(msg) ? msg.join(', ') : msg);
            },
        });
    };

    return (
        <Modal
            title="Thêm Permission mới"
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreate}
            >
                <Form.Item
                    name="name"
                    label="Tên Permission"
                    rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="method"
                    label="Method"
                    rules={[{ required: true, message: 'Vui lòng chọn Method' }]}
                >
                    <Select
                        options={Object.values(HttpMethod).map(method => ({
                            label: method,
                            value: method,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="path"
                    label="Path (API Endpoint)"
                    rules={[{ required: true, message: 'Vui lòng nhập Path' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item
                    name="module"
                    label="Module"
                    rules={[{ required: true, message: 'Vui lòng nhập Module' }]}
                >
                     <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" className='bg-green' htmlType="submit" loading={isPending}>
                        Thêm Permission
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}