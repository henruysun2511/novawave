import PlaylistUpdateModal from "@/components/client/Playlist/playlist-update-modal";
import { useToast } from "@/libs/toast";
import { useDeletePlaylist } from "@/queries/usePlaylistQuery";
import { Playlist } from "@/types/object.type";
import { DeleteOutlined, EditOutlined, GlobalOutlined, LockOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag } from "antd";
import { useState } from "react";
import PlaylistAddSongModal from "../../../components/client/Playlist/playlist-add-song-modal";


export default function PlaylistHeader({ playlist }: { playlist: Playlist }) {
    const [openAddSong, setOpenAddSong] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false); // State mới
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

    const toast = useToast();
    const { mutate: deletePlaylist, isPending: isDeleting } = useDeletePlaylist();


    const handleDelete = (id: string) => {
        deletePlaylist(id, {
            onSuccess: (res) => {
                toast.success(res?.data?.message || "Xóa playlist thành công");
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.message || "Xóa playlist thất bại"
                );
            },
        });
    };

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
                <span className="font-semibold text-base">
                    {playlist.name}
                </span>

                {playlist.status === "public" ? (
                    <Tag color="green" icon={<GlobalOutlined />}>
                        Công khai
                    </Tag>
                ) : (
                    <Tag color="red" icon={<LockOutlined />}>
                        Riêng tư
                    </Tag>
                )}
            </div>

            <Space>
                {/* Nút Thêm bài hát */}
                <Button size="small" type="primary" className="bg-green" icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlaylistId(playlist._id);
                        setOpenAddSong(true);
                    }}>
                    Thêm bài hát
                </Button>

                {/* Nút Sửa */}
                <Button
                    size="small"
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setOpenUpdateModal(true)} // Mở Update Modal
                >
                    Sửa
                </Button>

                {/* Nút Xóa (Popconfirm) */}
                <Popconfirm
                    title="Xóa Playlist?"
                    description={`Bạn có chắc chắn muốn xóa playlist "${playlist.name}"?`}
                    onConfirm={() => handleDelete(playlist._id)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ loading: isDeleting, danger: true }}
                >
                    <Button
                        size="small"
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        loading={isDeleting}
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            </Space>

            {/* Modal Thêm bài hát */}
            {selectedPlaylistId && (
                <PlaylistAddSongModal
                    open={openAddSong}
                    playlistId={selectedPlaylistId}
                    onCancel={() => {
                        setOpenAddSong(false);
                        setSelectedPlaylistId(null);
                    }}
                />
            )}

            {/* Modal Cập nhật Playlist */}
            {playlist && (
                <PlaylistUpdateModal
                    open={openUpdateModal}
                    currentPlaylist={playlist} // Truyền dữ liệu playlist hiện tại
                    onCancel={() => setOpenUpdateModal(false)}
                />
            )}
        </div>
    );
}