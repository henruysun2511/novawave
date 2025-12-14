import { useToast } from "@/libs/toast";
import { useDeleteAlbum } from "@/queries/useAlbumQuery"; // Giả định hook
import { Album } from "@/types/object.type"; // Giả định type Album
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs"; // Import dayjs
import { useState } from "react";
import ArtistAlbumDetailModal from "./artist-album-detail-modal";
import ArtistAlbumUpdateModal from "./artist-album-update-modal";


interface Props {
    data: Album[];
    loading: boolean;
    pagination?: any;
}

export default function ArtistAlbumTable({ data, loading, pagination }: Props) {
    const toast = useToast();
    const { mutate } = useDeleteAlbum();


    const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
    const [detailAlbumId, setDetailAlbumId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        mutate(id, {
            onSuccess: (res) =>
                toast.success(res?.data?.message || "Xoá Album thành công"),
            onError: (err: any) =>
                toast.error(err?.response?.data?.message || "Xoá Album thất bại"),
        });
    };


    const columns: ColumnsType<Album> = [
        {
            title: "Ảnh bìa",
            dataIndex: "img",
            key: "img",
            width: 80,
            render: (img: string, record) => {
                if (img) {
                    return (
                        <Image
                            width={60}
                            height={60}
                            src={img}
                            alt={record.name}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                    );
                }
                return <span className="text-gray-500 text-xs">Chưa có ảnh</span>;
            },
        },
        {
            title: "Tên Album",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày phát hành",
            dataIndex: "release_date",
            key: "release_date",
            width: 150,
            render: (dateString: string) =>
                dayjs(dateString).format('DD/MM/YYYY')
        },
        {
            title: "Số bài hát",
            dataIndex: "total_songs",
            key: "total_songs",
            width: 100,
            align: 'center',
        },
        {
            title: "Hành động",
            render: (_, record) => (
                <Space>
                    {/* Nút Xem chi tiết Album */}
                    <Button
                        type="primary"
                        className="bg-green"
                        icon={<EyeOutlined />}
                        onClick={() => setDetailAlbumId(record._id)}
                    >
                        Xem
                    </Button>

                    {/* Nút Sửa Album */}
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setEditingAlbum(record)}
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Xóa Album?"
                        description={`Bạn có chắc chắn muốn xóa Album "${record.name}"?`}
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                loading={loading}
                rowKey="_id"
                dataSource={data}
                columns={columns}
                pagination={pagination}
            />

            {/* DETAIL Modal */}
            <ArtistAlbumDetailModal
                open={!!detailAlbumId}
                albumId={detailAlbumId ?? undefined}
                onClose={() => setDetailAlbumId(null)}
            />

            {/* UPDATE Modal */}
            <ArtistAlbumUpdateModal
                open={!!editingAlbum}
                album={editingAlbum ?? undefined}
                onCancel={() => setEditingAlbum(null)}
            />
        </>
    )
}