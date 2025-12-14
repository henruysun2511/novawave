
import { useToast } from '@/libs/toast';
import { useCreatePlan } from '@/queries/usePlanQuery';
import { Plan } from '@/types/object.type';
import { Button, Form, Input, InputNumber, Modal, Typography } from 'antd';
import { useEffect } from 'react';

const { Title } = Typography;

interface PlanCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PlanCreateModal({ isOpen, onClose }: PlanCreateModalProps) {
    const [form] = Form.useForm<Plan>();
    const toast = useToast();
    const createMutation = useCreatePlan();

    useEffect(() => {
        if (!isOpen) {
            form.resetFields();
        }
    }, [isOpen, form]);

    const handleSubmit = (values: Plan) => {
        createMutation.mutate(values, {
            onSuccess: (res) => {
                toast.success(res?.data.message || "Tạo gói dịch vụ thành công!");
                onClose(); 
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Tạo gói dịch vụ thất bại.");
            },
        });
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            className="custom-modal"
            title={"Tạo Gói Dịch Vụ Mới"}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ durationInMonths: 1, price: 0, description: '' }}
            >
                {/* 1. Tên gói */}
                <Form.Item
                    name="planName"
                    label={<span>Tên gói (Ví dụ: Premium, VIP)</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập tên gói!' }]}
                >
                    <Input placeholder="Nhập tên gói dịch vụ"/>
                </Form.Item>

                {/* 2. Giá */}
                <Form.Item
                    name="price"
                    label={<span>Giá (VNĐ)</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <InputNumber<number>
                        min={0}
                        addonAfter="VNĐ"
                        className="w-fu"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => {
                            const parsedValue = value!.replace(/\$\s?|(,*)/g, '');
                            return Number(parsedValue);
                        }}
                    />
                </Form.Item>

                {/* 3. Thời hạn */}
                <Form.Item
                    name="durationInMonths"
                    label={<span>Thời hạn (Tháng)</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập thời hạn!' }]}
                >
                    <InputNumber
                        min={1}
                        max={100}
                        addonAfter="Tháng"
                        className="w-full"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label={<span>Mô tả</span>}
                >
                    <Input.TextArea rows={3} placeholder="Mô tả chi tiết về gói dịch vụ" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={createMutation.isPending}
                        className="w-full !bg-green hover:!bg-green-600 !mt-4"
                    >
                        Tạo Gói
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
