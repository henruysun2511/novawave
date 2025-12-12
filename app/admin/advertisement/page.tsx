"use client"
import Title from "@/components/ui/title";
import { useAdvertisementList } from "@/queries/useAdvertisementQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import { useState } from "react";
import { AdvertisementCreateModal } from "./advertisement-create-modal";
import AdvertisementTable from "./advertisement-table";
const { Search } = Input;
export default function AdvertisementManagementPage() {
    const [openAdsCreateModal, setOpenAdsCreateModal] = useState<boolean>(false)

    const [params, setParams] = useState({
        page: 1,
        size: 10,
        title: "",
        isActived: undefined as boolean | undefined,
    });

    const { data, isLoading } = useAdvertisementList(params);
    console.log(data)

    return (
        <>
            <Title>Quản lý quảng cáo</Title>
            <div className="mb-8"></div>
            <Space direction="vertical" className="w-full" size="large">
                <div className="flex justify-between">
                    <Space direction="horizontal" size="large">
                        <Search size='large' placeholder="Tìm kiếm tiêu đề quảng cáo" allowClear style={{ width: 550 }}
                            onSearch={(value) =>
                                setParams((prev) => ({ ...prev, title: value, page: 1 }))
                            } />
                        <Select size="large" style={{ width: 160 }} placeholder="Trạng thái" options={[
                            { value: true, label: "Đã kích hoạt" },
                            { value: false, label: "Chưa kích hoạt" },
                        ]}
                            onChange={(value) =>
                                setParams((prev) => ({ ...prev, isActived: value, page: 1 }))
                            } />
                    </Space>

                    <Button onClick={() => setOpenAdsCreateModal(true)} icon={<PlusOutlined />} size="large" type="primary" className="bg-green">Thêm quảng cáo</Button>
                </div>

                <AdvertisementTable
                    data={data?.data ?? []}
                    loading={isLoading}
                    pagination={{
                        current: data?.meta?.page,
                        pageSize: data?.meta?.size,
                        total: data?.meta?.totalElements,
                        onChange: (page: number) =>
                            setParams((prev) => ({ ...prev, page })),
                    }}
                />
            </Space>

            <AdvertisementCreateModal open={openAdsCreateModal} onCancel={() => setOpenAdsCreateModal(false)} />

        </>
    )
}