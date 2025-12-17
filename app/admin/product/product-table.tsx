import { useToast } from "@/libs/toast";
import { useAdminDeleteProduct, useDeleteProduct } from "@/queries/useProductQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/types/constant.type";
import { Product } from "@/types/object.type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import ProductUpdateModal from "./product-update-modal";

interface Props {
    data: Product[];
    loading?: boolean;
    pagination?: any;
}

export default function ProductTable({ data, loading, pagination }: Props) {
    const [editing, setEditing] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: deleteProductAdmin } = useAdminDeleteProduct();
    const toast = useToast();

    const { roleName } = useAuthStore();
    const finalRoleName = roleName || localStorage.getItem("roleName") || "null";


    const isSystemAdmin = finalRoleName === Role.SUPER_ADMIN || finalRoleName === Role.ADMIN;
    const isCommerceManager = finalRoleName === Role.COMMERCE_MANAGER;

    const handleDelete = (id: string) => {
        const mutationCallbacks = {
            onSuccess: (res: any) => {
                toast.success(res.data?.message || "Xóa sản phẩm thành công");
            },
            onError: (error: any) => {
                toast.error(error.response?.data?.message || "Bạn không có quyền thực hiện hành động này");
            },
        };

        if (isSystemAdmin) {
            deleteProductAdmin(id, mutationCallbacks);
        } else if (isCommerceManager) {
            deleteProduct(id, mutationCallbacks);
        } else {
            toast.error("Vai trò của bạn không được phép xóa sản phẩm");
        }
    };

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "img",
            key: "img",
            render: (img: string) => (
                <Image src={img} width={60} height={60} style={{ borderRadius: 8 }} />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (value: number) => value.toLocaleString() + "₫",
        },
        {
            title: "Số lượng tồn",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Hành động",
            render: (_: any, record: Product) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        onClick={() => {
                            setEditing(record);
                            setOpen(true);
                        }}
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Xóa sản phẩm?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];



    return (
        <>
            <Table
                rowKey="_id"
                dataSource={data}
                columns={columns}
                loading={loading}
                pagination={pagination}
            />

            <ProductUpdateModal
                open={open}
                onCancel={() => setOpen(false)}
                data={editing}
            />
        </>
    );
}