import { useToast } from "@/libs/toast";
import { useDeleteSong } from "@/queries/useSongQuery";
import { Song } from "@/types/object.type";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import ArtistSongDetailModal from "./artist-song-detail-modal";
import ArtistSongUpdateStatusModal from "./artist-song-status-modal";
import ArtistSongUpdateModal from "./artist-song-update-modal";


interface Props {
  data: Song[];
  loading: boolean;
}


interface Props {
  data: Song[];
  loading: boolean;
}

export default function ArtistSongTable({ data, loading }: Props) {
  const toast = useToast();

  const { mutate: deleteSong } = useDeleteSong();

  const [detailSongId, setDetailSongId] = useState<string | null>(null);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [editingStatusSong, setEditingStatusSong] = useState<Song | null>(null);

  const handleDelete = (id: string) => {
    deleteSong(id, {
      onSuccess: (res) =>
        toast.success(res?.data?.message || "Xoá thành công"),
      onError: (err: any) =>
        toast.error(err?.response?.data?.message || "Xoá thất bại"),
    });
  };


  const columns: ColumnsType<Song> = [
    { title: "Tên bài hát", dataIndex: "name" },

    {
      title: "Thời lượng",
      dataIndex: "duration",
      render: (v: number) =>
        `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => (
        <Button
            onClick={() => setEditingStatusSong(record)}
          >
            Cập nhật trạng thái
          </Button>
      ),
    },

    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            className="bg-green"
            icon={<EyeOutlined />}
            onClick={() => setDetailSongId(record._id)}
          >
            Xem
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setEditingSong(record)}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Xóa bài hát?"
            description="Bạn có chắc chắn muốn xóa bài hát này?"
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
      />

      {/* DETAIL */}
      <ArtistSongDetailModal
        open={!!detailSongId}
        songId={detailSongId ?? undefined}
        onClose={() => setDetailSongId(null)}
      />

      {/* UPDATE */}
      <ArtistSongUpdateModal
        open={!!editingSong}
        song={editingSong ?? undefined}
        onCancel={() => setEditingSong(null)}
      />

      <ArtistSongUpdateStatusModal
        open={!!editingStatusSong}
        songId={editingStatusSong?._id}
        onCancel={() => setEditingStatusSong(null)}
      />
    </>
  );
}
