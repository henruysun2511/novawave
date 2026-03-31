"use client";
import Title from "@/components/common/title";
import { useNewsList } from "@/queries/useNewsQuery";
import { NewsStatus } from "@/types/constant.type";
import { NewsParam } from "@/types/param.type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import { useState } from "react";
import NewsCreateModal from "./news-create-modal"; // 1. Import component
import NewsTable from "./news-table";

const { Search } = Input;

export default function NewsManagementPage() {
    const [openModal, setOpenModal] = useState(false);
    const [params, setParams] = useState<NewsParam>({
        page: 1,
        size: 10,
        title: "",
        status: undefined,
        sort: undefined
    });

    const { data, isLoading } = useNewsList(params);

    return (
        <Space direction="vertical" className="w-full" size="large">
            <Title>Quản lý tin tức</Title>
            
            <div className="flex justify-between items-center rounded-lg">
                <Space size="middle">
                    <Search
                        placeholder="Tìm kiếm tiêu đề tin tức..."
                        allowClear
                        size="large"
                        style={{ width: 400 }}
                        onSearch={(value) => setParams(prev => ({ ...prev, title: value, page: 1 }))}
                    />
                    
                    {/* Filter Status */}
                    <Select
                        size="large"
                        placeholder="Trạng thái"
                        style={{ width: 160 }}
                        allowClear
                        options={[
                            { value: NewsStatus.DRAFT, label: "Bản nháp" },
                            { value: NewsStatus.PUBLISHED, label: "Đã xuất bản" },
                            { value: NewsStatus.ARCHIVED, label: "Đã lưu trữ" },
                        ]}
                        onChange={(value) => setParams(prev => ({ ...prev, status: value, page: 1 }))}
                    />

                    {/* Filter Sort */}
                    <Select
                        size="large"
                        placeholder="Sắp xếp"
                        style={{ width: 180 }}
                        allowClear
                        options={[
                            { value: "createdAt", label: "Mới nhất" },
                            { value: "-createdAt", label: "Cũ nhất" },
                            { value: "title", label: "Tiêu đề A-Z" },
                        ]}
                        onChange={(value) => setParams(prev => ({ ...prev, sort: value, page: 1 }))}
                    />
                </Space>

                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    size="large" 
                    className="bg-green"
                    onClick={() => setOpenModal(true)}
                >
                    Thêm tin tức
                </Button>
            </div>

            <NewsTable 
                data={data?.data ?? []} 
                loading={isLoading}
                pagination={{
                    current: data?.meta?.page,
                    pageSize: data?.meta?.size,
                    total: data?.meta?.totalElements,
                    onChange: (page: number) => setParams(prev => ({ ...prev, page }))
                }}
            />
            
            {/* 2. Nhúng NewsCreateModal */}
            <NewsCreateModal 
                open={openModal} 
                onCancel={() => setOpenModal(false)} 
            />
        </Space>
    );
}