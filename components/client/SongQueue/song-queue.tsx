"use client"
import { useSongDetail } from "@/queries/useSongQuery";
import { SongService } from "@/services/song.service";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { ApiResponse } from "@/types/body.type";
import { Song } from "@/types/object.type";
import { DownSquareOutlined } from "@ant-design/icons";
import { useQueries } from "@tanstack/react-query";
import { Tooltip } from "antd";
import NewSongCard from "../NewSongList/newsong-card";






const getSongDetailQueryConfig = (id: string) => ({
    queryKey: ['song', id],
    queryFn: async () => {
        const response = await SongService.getDetail(id);
        return response.data; 
    }, 
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 phút
    select: (data: ApiResponse<Song>) => data.data as Song, 
});


export default function SongQueue() {
    const hidePanel = useSidebarStore((s) => s.hideRightPanel);
    const { status } = usePlayerStore();
    const { nowPlaying } = status;
    const fullQueueIds = status.queue; 

    // 1. Fetch chi tiết bài hát đang phát
    // Hook useSongDetail giả định trả về ApiResponse<SongType>
    const { data: songRes, isLoading: nowPlayingLoading } = useSongDetail(nowPlaying ?? "");
    const nowPlayingSong = songRes?.data as Song | undefined;
    
    // 2. Xác định danh sách ID bài hát "Tiếp theo"
    const nowPlayingIndex = fullQueueIds.indexOf(nowPlaying ?? '');
    const nextSongsIds = nowPlayingIndex !== -1 
        ? fullQueueIds.slice(nowPlayingIndex + 1)
        : fullQueueIds; 
        
    // 3. Fetch chi tiết các bài hát "Tiếp theo" (sử dụng useQueries)
    const results = useQueries({
        queries: nextSongsIds.map((id) => getSongDetailQueryConfig(id)),
    });

    // Lọc ra dữ liệu bài hát thành công
    const nextSongs = results
        .filter(res => res.isSuccess && res.data) // data ở đây là object Song đã được select
        .map(res => res.data as Song);
        
    const nextSongsLoading = results.some(res => res.isLoading);

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
                    {nowPlayingLoading && nowPlaying ? (
                        <div className="text-gray-400">Đang tải chi tiết bài hát...</div>
                    ) : nowPlayingSong ? (
                        <NewSongCard 
                            song={nowPlayingSong} 
                            isCurrentSong={true}
                            fullQueueIds={fullQueueIds}
                        />
                    ) : (
                        <div className="text-gray-400">Chưa có bài hát nào đang phát.</div>
                    )}
                </div>

                {/* PHẦN TIẾP THEO (HÀNG ĐỢI) */}
                <h3 className="text-base my-3 text-text-primary font-bold">Tiếp theo</h3>
                
                <div className="min-h-[80px]">
                    {nextSongsLoading && nextSongsIds.length > 0 ? (
                        <div className="text-gray-400">Đang tải danh sách hàng đợi...</div>
                    ) : nextSongs.length > 0 ? (
                        nextSongs.map((song) => (
                            <NewSongCard 
                                key={song._id} 
                                song={song} 
                                isCurrentSong={false}
                                fullQueueIds={fullQueueIds}
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