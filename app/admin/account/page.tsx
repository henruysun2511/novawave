"use client"
import Title from "@/components/ui/title";
import { useRoleList } from "@/queries/useRoleQuery";
import { useUserList } from "@/queries/useUserQuery";
import { UserStatus } from "@/types/constant.type";
import { UserParam } from "@/types/param.type";
import { Input, Select, Space } from "antd";
import { useState } from "react";
import UserTable from "./account-table";

export default function AccountManagementPage() {
    const [params, setParams] = useState<UserParam>({
        page: 1,
        size: 10,
        username: "",
        isPremium: undefined,
        status: undefined,
        roleName: undefined
    });

    const { data: userData, isPending } = useUserList(params);

    const { data: roleData } = useRoleList();
    const roleOptions = roleData?.data.map((r) => ({
        value: r.name,
        label: r.name
    }));

    return (
        <div>
            <Title>Quản lý tài khoản</Title>
            <div className="mb-8"></div>
            <Space direction="vertical" size={"large"} className="w-full">
                <Space direction="horizontal" size="large">

                    {/* SEARCH USERNAME */}
                    <Input.Search
                        size="large"
                        placeholder="Tìm kiếm username..."
                        allowClear
                        style={{ width: 250 }}
                        onSearch={(value) =>
                            setParams((prev) => ({
                                ...prev,
                                username: value || undefined,
                                page: 1,
                            }))
                        }
                    />

                    {/* FILTER PREMIUM */}
                    <div className="text-text-primary text-base">Premium:</div>
                    <Select
                        size="large"
                        allowClear
                        placeholder="Premium?"
                        style={{ width: 150 }}
                        options={[
                            { label: "Premium", value: true },
                            { label: "Không Premium", value: false },
                        ]}
                        onChange={(value) =>
                            setParams((prev) => ({
                                ...prev,
                                isPremium: value,
                                page: 1,
                            }))
                        }
                    />

                    {/* FILTER STATUS */}
                    <div className="text-text-primary text-base">Trạng thái:</div>
                    <Select
                        size="large"
                        allowClear
                        placeholder="Trạng thái"
                        style={{ width: 150 }}
                        options={[
                            { label: "Active", value: UserStatus.ACTIVE },
                            { label: "Inactive", value: UserStatus.INACTIVE },
                        ]}
                        onChange={(value) =>
                            setParams((prev) => ({
                                ...prev,
                                status: value,
                                page: 1,
                            }))
                        }
                    />

                    {/* FILTER ROLE */}
                    <div className="text-text-primary text-base">Role:</div>
                    <Select
                        size="large"
                        allowClear
                        placeholder="Vai trò"
                        style={{ width: 180 }}
                        options={roleOptions}
                        onChange={(value) =>
                            setParams((prev) => ({
                                ...prev,
                                roleName: value,
                                page: 1,
                            }))
                        }
                    />
                </Space>

                <UserTable
                    data={userData?.data ?? []}
                    loading={isPending}
                    pagination={{
                        current: userData?.meta?.page,
                        pageSize: userData?.meta?.size,
                        total: userData?.meta?.totalElements,
                        onChange: (page: number) =>
                            setParams((prev) => ({ ...prev, page })),
                    }}
                />
            </Space>
        </div>
    );
}