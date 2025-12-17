"use client";

import { useCommerceProductList, useProductList } from "@/queries/useProductQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/types/constant.type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import { ProductCreateModal } from "./product-create-modal";
import ProductTable from "./product-table";

const { Search } = Input;

export default function ProductManagementPage() {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const { roleName } = useAuthStore();
    
    const finalRoleName = roleName || (typeof window !== 'undefined' ? localStorage.getItem("roleName") : "null");
    const isSystemAdmin = finalRoleName === Role.SUPER_ADMIN || finalRoleName === Role.ADMIN;
    const isCommerceManager = finalRoleName === Role.COMMERCE_MANAGER;

    const [params, setParams] = useState({
        page: 1,
        size: 10,
        name: "",
        start: 0,
        end: 100000000
    });

    // 1. Chỉ fetch data Admin nếu là Admin
    const { data: adminData, isLoading: adminLoading } = useProductList(params, { 
        enabled: isSystemAdmin 
    });
    
    // 2. Chỉ fetch data Commerce nếu là Commerce Manager và truyền đủ params
    const { data: commerceData, isLoading: commerceLoading } = useCommerceProductList({ 
        enabled: isCommerceManager 
    });

    // Xác định dữ liệu thực tế sẽ hiển thị dựa trên Role
    const displayData = isSystemAdmin ? adminData : commerceData;
    const isLoading = isSystemAdmin ? adminLoading : commerceLoading;

    return (
        <>
            <Space direction="vertical" className="w-full" size="large">
                <div className="flex justify-between">
      
                    <Space direction="horizontal" size="large">
                         <div className="flex gap-5">
                            <Search
                                className="custom-search"
                                size="large"
                                placeholder="Tìm kiếm tên sản phẩm"
                                allowClear
                                style={{ width: 400 }}
                                onSearch={(value) =>
                                    setParams((prev) => ({ ...prev, name: value, page: 1 }))
                                }
                            />
                        </div>
                    </Space>

                    {(isCommerceManager) && (
                        <Button
                            onClick={() => setOpenCreateModal(true)}
                            icon={<PlusOutlined />}
                            size="large"
                            type="primary"
                            className="bg-green"
                        >
                            Thêm sản phẩm
                        </Button>
                    )}
                </div>

                <ProductTable
                    data={displayData?.data ?? []}
                    loading={isLoading}
                    pagination={{
                        current: displayData?.meta?.page,
                        pageSize: displayData?.meta?.size,
                        total: displayData?.meta?.totalElements,
                        onChange: (page: number) =>
                            setParams((prev) => ({ ...prev, page })),
                    }}
                />
            </Space>

            <ProductCreateModal
                open={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
            />
        </>
    );
}