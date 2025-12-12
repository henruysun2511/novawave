"use client";

import { useProductList } from "@/queries/useProductQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import { ProductCreateModal } from "./product-create-modal";
import ProductTable from "./product-table";

const { Search } = Input;

export default function ProductManagementPage() {
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [params, setParams] = useState({
        page: 1,
        size: 10,
        name: "",
        start: 0,
        end: 100000000
    });

    const { data, isLoading } = useProductList(params);

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
                                style={{ width: 550 }}
                                onSearch={(value) =>
                                    setParams((prev) => ({ ...prev, name: value, page: 1 }))
                                }
                            />

                            <div className="flex gap-3">
                                <div className="flex gap-2 items-center">
                                    <p className="text-text-primary text-base">Giá từ: </p>
                                    <Input className="w-[150px]" onChange={(e) =>
                                        setParams((prev) => ({
                                            ...prev,
                                            start: Number(e.target.value),
                                            page: 1,
                                        }))
                                    } />
                                </div>

                                <div className="flex gap-2 items-center">
                                    <p className="text-text-primary text-base">đến </p>
                                    <Input className="w-[150px]" onChange={(e) =>
                                        setParams((prev) => ({
                                            ...prev,
                                            end: Number(e.target.value),
                                            page: 1,
                                        }))
                                    } />
                                </div>
                            </div>
                        </div>

                    </Space>

                    <Button
                        onClick={() => setOpenCreateModal(true)}
                        icon={<PlusOutlined />}
                        size="large"
                        type="primary"
                        className="bg-green"
                    >
                        Thêm sản phẩm
                    </Button>
                </div>

                <ProductTable
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

            <ProductCreateModal
                open={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
            />
        </>
    );
}