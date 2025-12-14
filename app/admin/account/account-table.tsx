import { useToast } from "@/libs/toast";
import { useDeleteUser, useToggleStatus, useUpdateUserRole } from "@/queries/useUserQuery";
import { Role } from "@/types/constant.type";
import { User } from "@/types/object.type";
import { Button, Popconfirm, Select, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface Props {
    data: User[];
    loading: boolean;
    pagination: any;
    roleOptions: { value: string; label: string; _id: string }[];
}


export default function UserTable({ data, loading, pagination, roleOptions }: Props) {
    const { mutate: toggleStatus, isPending: isToggling } = useToggleStatus();
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
    const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateUserRole();
    const toast = useToast();

    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);


    const handleToggle = (id: string) => {
        setLoadingUserId(id);
        toggleStatus(id, {
            onSuccess: (res: any) => {
                const msg = res?.data?.message || res?.message || "Cập nhật trạng thái thành công";
                toast.success(msg);
                setLoadingUserId(null);
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Cập nhật thất bại";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                setLoadingUserId(null);
            },
        });
    };

    const handleDelete = (id: string) => {
        setLoadingUserId(id);
        deleteUser(id, {
            onSuccess: (res: any) => {
                const msg = res?.data?.message || res?.message || "Xóa user thành công";
                toast.success(msg);
                setLoadingUserId(null);
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Xóa thất bại";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                setLoadingUserId(null);
            },
        });
    };

    const handleUpdateRole = (userId: string, newRoleName: string) => {
        if (newRoleName === Role.ARTIST) {
            toast.error("Không thể gán vai trò");
            return; 
        }

        const selectedRole = roleOptions.find(r => r.value === newRoleName);

        if (!selectedRole) {
            toast.error("Vai trò không hợp lệ.");
            return;
        }

        setLoadingUserId(userId);
        updateRole({ id: userId, roleId: selectedRole._id }, {
            onSuccess: (res: any) => {
                const msg = res?.data?.message || res?.message || "Cập nhật vai trò thành công";
                toast.success(msg);
                setLoadingUserId(null);
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Cập nhật vai trò thất bại";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                setLoadingUserId(null);
            },
        });
    }


    const columns: ColumnsType<User> = [
        {
            title: "Tên",
            dataIndex: "username"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Premium",
            render: (_, record) => record.isPremium ? "Có" : "Không"
        },
        {
            title: "Vai trò",
            render: (_, record) => (
                <Select
                    style={{ width: 120 }}
                    value={record.role?.name}
                    options={roleOptions}
                    loading={isUpdatingRole && loadingUserId === record._id}
                    disabled={isUpdatingRole && loadingUserId !== record._id}
                    onChange={(value) => handleUpdateRole(record._id, value)}
                />
            )
        },
        {
            title: "Trạng thái",
            render: (_, record) => (
                <Switch
                    checked={record.status === "active"}
                    loading={isToggling && loadingUserId === record._id}
                    disabled={isToggling && loadingUserId !== record._id}
                    onClick={() => handleToggle(record._id)}
                />
            )
        },
        {
            title: "Hành động",
            render: (_, record) => (
                <Popconfirm
                    title="Bạn chắc chắn xóa?"
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => handleDelete(record._id)}
                >
                    <Button
                        danger
                        loading={isDeleting && loadingUserId === record._id}
                        disabled={isDeleting && loadingUserId !== record._id}
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            )
        },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}