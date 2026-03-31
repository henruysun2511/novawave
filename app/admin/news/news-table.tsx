"use client";
import { useToast } from "@/libs/toast";
import { useDeleteNews, useUpdateNewsStatus } from "@/queries/useNewsQuery";
import { NewsStatus } from "@/types/constant.type";
import { News } from "@/types/object.type";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table"; // Import type này
import { useState } from "react";
import { NewsDetailModal } from "./news-detail-modal";
import NewsUpdateModal from "./news-update-modal";

interface Props {
    data: News[];
    loading?: boolean;
    pagination?: any;
}

export default function NewsTable({ data, loading, pagination }: Props) {
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [detailNews, setDetailNews] = useState<News | null>(null);
    const { mutate: deleteNews } = useDeleteNews();
    const { mutate: updateStatus } = useUpdateNewsStatus();
    const toast = useToast();

    const columns: ColumnsType<News> = [
        {
            title: "Ảnh bìa",
            dataIndex: "imageUrl",
            width: 120,
            render: (url: string) => (
                <Image
                    src={url}
                    width={80}
                    height={60}
                    className="rounded object-cover"
                    fallback="/no-image.png"
                />
            )
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            width: 300,
            ellipsis: true // Thêm cái này để tiêu đề dài không làm vỡ giao diện
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            render: (status: string, record: any) => (
                <Select
                    value={status}
                    className="w-full"
                    onChange={(newStatus) => updateStatus({ id: record._id, status: newStatus }, {
                        onSuccess: () => toast.success("Đã cập nhật trạng thái")
                    })}
                    options={[
                        { value: NewsStatus.PUBLISHED, label: <Tag color="green">Xuất bản</Tag> },
                        { value: NewsStatus.DRAFT, label: <Tag color="orange">Bản nháp</Tag> },
                    ]}
                />
            )
        },
        {
            title: "Hành động",
            align: "center", // Bây giờ TS đã hiểu đây là 'center' (AlignType)
            width: 250,
            render: (_, record: any) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => setDetailNews(record)}>Xem</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => setEditingNews(record)}>Sửa</Button>
                    <Popconfirm
                        title="Xác nhận xóa?"
                        onConfirm={() => deleteNews(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination}
            />

            <NewsUpdateModal
                open={!!editingNews}
                news={editingNews}
                onCancel={() => setEditingNews(null)}
            />

            <NewsDetailModal
                open={!!detailNews}
                newsId={detailNews?._id ?? null} 
                onCancel={() => setDetailNews(null)}
            />
        </>
    );
}