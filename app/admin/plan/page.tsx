"use client"
import Title from '@/components/ui/title';
import { usePlans } from '@/queries/usePlanQuery';
import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Spin } from 'antd';
import { useState } from 'react';
import PlanCard from './plan-card';
import PlanCreateModal from './plan-create-modal';


export default function PlanManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch danh sách Plans
    const { data: plansRes, isLoading, isError, error } = usePlans();
    console.log(plansRes)

    const plans = plansRes?.data.data || [];

    return (
        <div className="p-6">

            <Title>
                Quản Lý Gói Dịch Vụ
            </Title>
            <div className='mb-8'></div>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                className="!bg-green hover:!bg-green-600 mb-5"
                onClick={() => setIsModalOpen(true)}
            >
                Thêm Gói Mới
            </Button>
            {isLoading && (
                <div className="text-center py-10">
                    <Spin size="large" />
                </div>
            )}

            {isError && (
                <Alert
                    message="Lỗi tải dữ liệu"
                    description={`Không thể tải danh sách gói dịch vụ: ${error.message}`}
                    type="error"
                    showIcon
                    className="bg-red-900/50 border-red-500 text-red-100"
                />
            )}

            {/* Hiển thị danh sách Cards */}
            {!isLoading && plans.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <PlanCard key={plan._id} plan={plan} />
                    ))}
                </div>
            )}

            {/* Hiển thị khi không có Plans */}
            {!isLoading && !isError && plans.length === 0 && (
                <div className="text-center py-10 text-white text-xl">
                    Hiện chưa có gói dịch vụ nào được tạo.
                </div>
            )}

            {/* Modal Tạo Gói Dịch Vụ Mới */}
            <PlanCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}