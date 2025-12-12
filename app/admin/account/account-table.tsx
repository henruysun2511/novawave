import { useToast } from "@/libs/toast";
import { useDeleteUser, useToggleStatus } from "@/queries/useUserQuery";
import { User } from "@/types/object.type";
import { Button, Popconfirm, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
    data: User[];
    loading?: boolean;
    pagination: any;
}


export default function UserTable({ data, loading, pagination }: Props) {
    const { mutate: toggleStatus, isPending: isToggling } = useToggleStatus();
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
    const toast = useToast();

    const handleToggle = (id: string) => {
        toggleStatus(id, {
            onSuccess: (res: any) => {
                const msg =
                    res?.data?.message ||
                    res?.message ||
                    "Cập nhật trạng thái thành công";

                toast.success(msg);
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Cập nhật thất bại";

                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };

    const handleDelete = (id: string) => {
        deleteUser(id, {
            onSuccess: (res: any) => {
                const msg =
                    res?.data?.message ||
                    res?.message ||
                    "Xóa user thành công";

                toast.success(msg);
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Xóa thất bại";

                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };
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
            title: "Vai trò",
            render: (_, record) => record.role?.name
        },
        {
            title: "Premium",
            render: (_, record) => record.isPremium ? "Có" : "Không"
        },
        {
            title: "Trạng thái",
            render: (_, record) => (
                <Switch
                    checked={record.status === "active"}
                    loading={isToggling}
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
                    <Button danger loading={isDeleting}>Xóa</Button>
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