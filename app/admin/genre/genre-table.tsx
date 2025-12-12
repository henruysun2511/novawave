import { useDeleteGenre } from "@/queries/useGenreQuery";
import { Genre } from "@/types/object.type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import GenreUpdateModal from "./genre-update-modal";

export default function GenreTable({ data, loading }: { data: Genre[], loading?: boolean }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Genre | null>(null);
    const { mutate: deleteGenre } = useDeleteGenre();

    const columns = [
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            render: (_: any, record: Genre) => (
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
                        title="Xóa thể loại?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => deleteGenre(record._id)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table rowKey="_id" dataSource={data} columns={columns} loading={loading} />

            <GenreUpdateModal open={open} onCancel={() => setOpen(false)} data={editing} />
        </>
    );
}
