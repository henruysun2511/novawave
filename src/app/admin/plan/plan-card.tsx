import { Plan } from '@/types/object.type';
import { ClockCircleOutlined, DeleteOutlined, DollarCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

interface PlanCardProps {
    plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
    const formatCurrency = (amount: number | null | undefined) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0 VNĐ';
        }
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <Card
            className="!bg-[var(--background-tertiary)] !border-none shadow-lg hover:shadow-xl transition duration-300"
            style={{ width: 300 }}
            actions={[
                <Button key="edit" type="text" icon={<EditOutlined className="text-blue-500" />}>Sửa</Button>,
                <Button key="delete" type="text" danger icon={<DeleteOutlined />}>Xóa</Button>,
            ]}
        >
            <div className="flex flex-col items-center text-white">
                <Title level={2} className="!text-green !mb-3 !mt-0 uppercase">
                    {plan.planName ?? "Đang cập nhật"}
                </Title>

                <div className="flex items-center gap-2 mb-3">
                    <DollarCircleOutlined className="text-xl text-green" />
                    <Text className="!text-white !text-2xl font-bold">
                        {formatCurrency(plan.price)}
                    </Text>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <ClockCircleOutlined className="text-gray-400" />
                    <Text className="!text-gray-400">
                        Thời hạn: {plan.durationInMonths} tháng
                    </Text>
                </div>

                <p className="text-gray-300 text-center italic mt-2 min-h-[50px]">
                    {plan.description || "Không có mô tả chi tiết."}
                </p>
            </div>
        </Card>
    );
};
