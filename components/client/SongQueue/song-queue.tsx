import { usePlayFromQueue } from "@/queries/usePlayerQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Song } from "@/types/object.type";
import { DownSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import NewSongCard from "../NewSongList/newsong-card";

export default function SongQueue() {
    const hidePanel = useSidebarStore((s) => s.hideRightPanel);
    const { status } = usePlayerStore();
    const { nowPlayingId, nowPlaying, queueIds, queue } = status;

    const { mutate: playFromQueue, isPending } = usePlayFromQueue();

    const handlePlayFromQueue = (songId: string) => {
        if (isPending) return;
        playFromQueue({ songId });
    };

    const nowPlayingSong = nowPlaying as Song | undefined;
    const nextSongs = (queue || []) as Song[];

    return (
        <>
            <div className="bg-[var(--background-secondary)] rounded-2xl overflow-scroll scrollbar-hidden w-full h-full p-5">
                <div className="flex gap-3 items-center mb-8">
                    <Tooltip title="Đóng hàng đợi" placement="top">
                        <DownSquareOutlined
                            className="text-text-primary font-bold cursor-pointer text-xl"
                            onClick={hidePanel}
                        />
                    </Tooltip>
                    <h1 className="text-xl text-text-primary font-bold">Danh sách đợi</h1>
                </div>

                {/* PHẦN ĐANG PHÁT */}
                <h3 className="text-base my-3 text-text-primary font-bold">Đang phát</h3>
                
                <div className="min-h-[80px]">
                    {nowPlayingId && !nowPlayingSong ? (
                        <div className="text-gray-400">Đang tải chi tiết bài hát...</div>
                    ) : nowPlayingSong ? (
                        <NewSongCard 
                            song={nowPlayingSong} 
                            isCurrentSong={true}
                            fullQueueIds={queueIds}
                        />
                    ) : (
                        <div className="text-gray-400">Chưa có bài hát nào đang phát.</div>
                    )}
                </div>

                {/* PHẦN TIẾP THEO (HÀNG ĐỢI) */}
                <h3 className="text-base my-3 text-text-primary font-bold">Tiếp theo</h3>
                
                <div className="min-h-[80px]">
                    {nextSongs.length > 0 ? (
                        nextSongs.map((song) => (
                            <NewSongCard 
                                key={song._id} 
                                song={song} 
                                isCurrentSong={false}
                                fullQueueIds={queueIds}
                                onPlay={() => handlePlayFromQueue(song._id)}
                            />
                        ))
                    ) : (
                        <div className="text-gray-400">Danh sách hàng đợi trống.</div>
                    )}
                </div>

            </div>
        </>
    );
}