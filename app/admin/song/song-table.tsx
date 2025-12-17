"use client";
import { useToast } from "@/libs/toast";
import { useDeleteSongByAdmin } from "@/queries/useSongQuery"; // Giả định hook này đã được tạo
import { Song } from "@/types/object.type"; // Giả định type Song
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
    data: Song[];
    loading?: boolean;
    pagination?: any;
}

export default function SongTable({
    data,
    loading,
    pagination,
}: Props) {
    const { mutate: deleteSong, isPending } = useDeleteSongByAdmin();
    const toast = useToast();

    

    const handleDelete = (id: string) => {
        deleteSong(id, {
            onSuccess: (res) => {
                toast.success(res.data?.message || "Xóa bài hát thành công");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Xóa bài hát thất bại");
            },
        });
    };

    const columns: ColumnsType<Song> = [
        {
            title: "Tên bài hát",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh bìa",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: 100,
            align: "center",
            render: (imageUrl) =>
                imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="cover"
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                        preview
                    />
                ) : (
                    <div>Không có</div>
                ),
        },
        {
            title: "Thể loại",
            dataIndex: "genreNames",
            key: "genreNames",
            render: (genreNames: string[]) => genreNames.join(", "),
        },
        {
            title: "Thời lượng",
            dataIndex: "duration",
            key: "duration",
            render: (v: number) =>
                `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`,
        },
        {
            title: "File Audio",
            dataIndex: "audioUrl", 
            key: "audioUrl",
            width: 220,
            render: (audioUrl) =>
                audioUrl ? (
                    <audio
                        src={audioUrl}
                        controls
                        style={{ width: 200, height: 32 }}
                    />
                ) : (
                    <div>Không có</div>
                ),
        },
        {
            title: "Hành động",
            align: "center",
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Xóa bài hát?"
                        description="Bạn có chắc chắn muốn xóa bài hát này vĩnh viễn?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button
                            type="primary"
                            className="bg-red-500"
                            danger
                            icon={<DeleteOutlined />}
                            loading={isPending}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
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