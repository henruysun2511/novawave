"use client";
import Title from '@/components/ui/title';
import { useRoleList } from '@/queries/useRoleQuery';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useState } from 'react';
import RoleAssignModal from './role-assign-modal';
import RoleCreateModal from './role-create-modal';
import RoleTable from './role-table';
import RoleUpdateModal from './role-update-modal';


interface Role { 
    _id: string;
    name: string;
    description?: string;
}

export default function RoleManagementPage() {
    // State cho Modal Tạo mới
    const [openCreate, setOpenCreate] = useState(false);
    
    // State cho Modal Sửa
    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    // State cho Modal Gán quyền (tính sau)
    const [openAssign, setOpenAssign] = useState(false);
    const [assigningRole, setAssigningRole] = useState<Role | null>(null);

    const { data: roleData, isPending } = useRoleList();
    const roles: Role[] = roleData?.data ?? [];

    // Xử lý mở Modal Sửa
    const handleOpenEdit = (role: Role) => {
        setEditingRole(role);
        setOpenUpdate(true);
    };

    // Xử lý đóng Modal Sửa
    const handleCloseEdit = () => {
        setOpenUpdate(false);
        setEditingRole(null);
    };

    // Xử lý mở Modal Gán quyền (chưa triển khai logic bên trong)
    const handleOpenAssign = (role: Role) => {
        setAssigningRole(role);
        setOpenAssign(true);
        // ... Logic mở modal gán quyền
    };

    return (
        <div>
            <Title>Quản lý Vai trò (Roles)</Title>
            <div className='mb-8'></div>
            
            <Space direction="vertical" size={"large"} className="w-full">
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setOpenCreate(true)}
                    className='bg-green'
                    size='large'
                >
                    Thêm Role
                </Button>

                <RoleTable
                    data={roles}
                    loading={isPending}
                    onEdit={handleOpenEdit} 
                    onAssignPermissions={handleOpenAssign} 
                />
            </Space>

            <RoleCreateModal 
                open={openCreate} 
                onCancel={() => setOpenCreate(false)} 
            />

            <RoleUpdateModal 
                open={openUpdate} 
                onCancel={handleCloseEdit}
                currentRole={editingRole} 
            />

            <RoleAssignModal 
                open={openAssign} 
                onCancel={() => {
                    setOpenAssign(false);
                    setAssigningRole(null);
                }}
                role={assigningRole}
            />
        </div>
    );
}