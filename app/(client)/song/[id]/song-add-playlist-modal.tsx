import { useToast } from "@/libs/toast";
import { useAddSongToPlaylist, useUserPlaylists } from "@/queries/usePlaylistQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, List, Modal, Spin } from "antd";

interface SongAddPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    songId: string; 
}

export default function SongAddPlaylistModal ({
    isOpen,
    onClose,
    songId,
} : SongAddPlaylistModalProps)  {
    const toast = useToast();
    
    const { 
        data: playlistsRes, 
        isLoading: isLoadingPlaylists,
        isFetching: isFetchingPlaylists,
    } = useUserPlaylists();
    
    const playlists = playlistsRes?.data || [];
    console.log(playlists)

    const addSongMutation = useAddSongToPlaylist();


    const handleAddSong = (playlistId: string, playlistName: string) => {
        if (!songId) {
            toast.error("Bài hát không có ID hợp lệ.");
            return;
        }

        addSongMutation.mutate({ playlistId, songId }, {
            onSuccess: (res: any) => {
                toast.success(res?.data?.message || `Đã thêm bài hát vào Playlist "${playlistName}" thành công!`);
                onClose(); 
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || "Thêm vào Playlist thất bại.";
                toast.error(errorMessage);
            }
        });
    };
    
    const isMutating = addSongMutation.isPending;
    const isLoading = isLoadingPlaylists || isFetchingPlaylists;

    return (
        <Modal
            title={"Chọn Playlist để thêm"}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            className="custom-modal"
        >
            {isLoading ? (
                <div className="text-center py-5">
                    <Spin tip={<span className="!text-white">Đang tải danh sách Playlist...</span>} />
                </div>
            ) : playlists.length === 0 ? (
                <p className="text-black text-center py-5">
                    Bạn chưa có Playlist nào. 
                </p>
            ) : (
                <List
                    dataSource={playlists}
                    renderItem={(item) => (
                        <List.Item
                            key={item._id}
                            className="!border-b !border-[#2a2a2a]  transition cursor-default"
                            actions={[
                                <Button 
                                    type="primary" 
                                    className="!bg-green hover:!bg-green-700"
                                    onClick={() => handleAddSong(item._id, item.name)}
                                    loading={isMutating}
                                    disabled={isMutating}
                                >
                                    Thêm
                                </Button>
                            ]}
                        >
                            <div className="flex items-center gap-3">
                                <PlusOutlined className="text-gray-400" />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    );
};
