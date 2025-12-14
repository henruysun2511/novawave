import PlaylistCard from "@/components/client/Playlist/playlist-card";
import PlaylistCreateModal from "@/components/client/Playlist/playlist-create-modal";
import PlaylistUpdateModal from "@/components/client/Playlist/playlist-update-modal";
import { useToast } from "@/libs/toast";
import { useDeletePlaylist, useUserPlaylists } from "@/queries/usePlaylistQuery";
import { Playlist } from "@/types/object.type";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { useState } from "react";

export default function UserPlaylist() {
    const toast = useToast();
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);

    const { data: userPlaylistRes } = useUserPlaylists();
    const userPlaylists = userPlaylistRes?.data ?? [];


    const handleOpenEdit = (playlist: Playlist) => {
        setEditingPlaylist(playlist);
        setOpenUpdate(true);
    };

    const handleCloseEdit = () => {
        setOpenUpdate(false);
        setEditingPlaylist(null);
    };


    const { mutate: deletePlaylist, isPending: isDeleting } = useDeletePlaylist();

    const handleDelete = (id: string, name: string) => {
        deletePlaylist(id, {
            onSuccess: (res: any) => {
                toast.success(res?.message || `Xóa playlist "${name}" thành công`);
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.message || "Xóa playlist thất bại"
                );
            },
        });
    };

    return (
        <>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                className="bg-[var(--background-secondary)] ml-3 mb-5"
                onClick={() => setOpenCreate(true)}
            >
                Thêm playlist
            </Button>
            {userPlaylists && userPlaylists.length > 0 ? (
                <>
                    <div className="flex flex-wrap gap-5">
                        {userPlaylists.map((playlist: Playlist) => (
                            <>
                                <div key={playlist._id} className="group relative">
                                    <PlaylistCard playlist={playlist} />

                                    <Space className="absolute top-5 right-1 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/50 p-1 rounded-md">
                                        <Button
                                            size="small"
                                            icon={<EditOutlined />}
                                            onClick={() => handleOpenEdit(playlist)}
                                        />
                                        <Popconfirm
                                            title="Xóa Playlist?"
                                            description={`Bạn có chắc chắn muốn xóa playlist "${playlist.name}"?`}
                                            onConfirm={() => handleDelete(playlist._id, playlist.name)}
                                            okText="Xóa"
                                            cancelText="Hủy"
                                            okButtonProps={{ loading: isDeleting, danger: true }}
                                        >
                                            <Button size="small" danger icon={<DeleteOutlined />} loading={isDeleting} />
                                        </Popconfirm>
                                    </Space>
                                </div>
                            </>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-text-primary text-base">
                    Chưa có playlist nào
                </div>
            )}

            <PlaylistCreateModal open={openCreate} onCancel={() => setOpenCreate(false)} />
            <PlaylistUpdateModal
                open={openUpdate}
                onCancel={handleCloseEdit}
                currentPlaylist={editingPlaylist}
            />
        </>
    )
}