"use client";
import Title from '@/components/ui/title';
import { usePermissionList } from '@/queries/usePermissionQuery';
import { HttpMethod } from '@/types/constant.type';
import { PermissionParam } from '@/types/param.type';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { useState } from 'react';
import PermissionCreateModal from './permission-create-table';
import PermissionTable from './permission-table';



export default function PermissionManagementPage() {
    const [openCreate, setOpenCreate] = useState(false);
    const [params, setParams] = useState<PermissionParam>({
        page: 1,
        size: 10,
        name: undefined,
        method: undefined,
    });

    const { data: permissionData, isPending } = usePermissionList(params);
    
    const methodOptions = Object.values(HttpMethod).map(method => ({
        label: method,
        value: method,
    }));

    return (
        <div>
            <Title>Quản lý Quyền hạn (Permissions)</Title>
            <div className='mb-8'></div>
            
            <Space direction="vertical" size={"large"} className="w-full">
                <div>
                    
                </div>
                <Space direction="horizontal" size="large">
                    <Input.Search
                        size="large"
                        placeholder="Tìm kiếm theo tên..."
                        allowClear
                        style={{ width: 250 }}
                        onSearch={(value) =>
                            setParams((prev) => ({
                                ...prev,
                                name: value || undefined,
                                page: 1,
                            }))
                        }
                    />

                    <div className="text-text-primary text-base">Method:</div>
                    <Select
                        size="large"
                        allowClear
                        placeholder="Chọn Method"
                        style={{ width: 150 }}
                        options={methodOptions}
                        onChange={(value) =>
                            setParams((prev) => ({
                                ...prev,
                                method: value,
                                page: 1,
                            }))
                        }
                    />
                    
                    {/* Button Thêm */}
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenCreate(true)}
                        size='large'
                        className='bg-green'
                    >
                        Thêm Permission
                    </Button>
                </Space>


                <PermissionTable
                    data={permissionData?.data ?? []}
                    loading={isPending}
                    pagination={{
                        current: permissionData?.meta?.page,
                        pageSize: permissionData?.meta?.size,
                        total: permissionData?.meta?.totalElements,
                        onChange: (page: number) =>
                            setParams((prev) => ({ ...prev, page })),
                    }}
                />
            </Space>

            <PermissionCreateModal 
                open={openCreate} 
                onCancel={() => setOpenCreate(false)} 
            />
        </div>
    );
}