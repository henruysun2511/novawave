import { useToast } from "@/libs/toast";
import { usePlaylistsSong, useRemoveSongFromPlaylist } from "@/queries/usePlaylistQuery";
import { Button, Popconfirm } from "antd";

export default function PlaylistSongList({ playlistId }: { playlistId: string }) {
    const { data, isLoading } = usePlaylistsSong(playlistId);
    const songs = data?.data;
    console.log(data)


    const toast = useToast();
    const { mutate: removeSong, isPending } = useRemoveSongFromPlaylist();

    const handleRemove = (songId: string) => {
        removeSong(
            { playlistId, songId },
            {
                onSuccess: (res) => {
                    toast.success(res?.data?.message || "Đã xóa bài hát khỏi playlist");
                },
                onError: (err: any) => {
                    toast.error(
                        err?.response?.data?.message || "Xóa bài hát thất bại"
                    );
                },
            }
        );
    };

    if (isLoading) return <div>Đang tải bài hát...</div>;

    if (!songs || songs.length === 0) {
        return (
            <div className="text-gray-500 py-4">
                Playlist chưa có bài hát
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 py-2">
            {songs.map((song: any, index: number) => (
                <div
                    key={song._id}
                    className="flex justify-between items-center p-2 rounded"
                >
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 w-6 text-right">
                            {index + 1}
                        </span>

                        <img
                            src={song.imageUrl || "/images/default-cover.png"}
                            alt={song.name}
                            className="w-[48px] h-[48px] object-cover rounded"
                        />

                        <div>
                            <div className="font-medium text-black">
                                {song.name || "Đang cập nhật"}
                            </div>

                            <div className="text-sm text-gray-400">
                                {song.duration
                                    ? `${Math.floor(song.duration / 60)}:${String(
                                        Math.floor(song.duration % 60)
                                    ).padStart(2, "0")}`
                                    : "Đang cập nhật"}
                            </div>
                        </div>
                    </div>

                    <Popconfirm
                        title="Xóa bài hát khỏi playlist?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleRemove(song._id)}
                    >
                        <Button size="small" danger loading={isPending}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ))}
        </div>
    );
}