"use client";

import { EmptyState } from "@/components/common/empty";
import ListSkeleton from "@/components/common/Skeleton/list-skeleton";
import { useToast } from "@/hooks/useToast";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { useSongLeaderboard, useSongList } from "@/queries/useSongQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlaySongType } from "@/types/constant.type";
import { Song } from "@/types/object.type";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CustomerServiceOutlined,
  PlayCircleFilled
} from "@ant-design/icons";

export default function TopSong3() {
    const toast = useToast();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
    const isCurrentAd = nowPlayingType === PlaySongType.ADVERTISEMENT;

    // 1. Lấy Top 5 tuần
    const { data: weekTopSongsRes, isLoading: isTopLoading } = useSongLeaderboard('week');
    const weekTopSongs = weekTopSongsRes?.data || [];

    // 2. Lấy 5 bài mới nhất
    const { data: newSongsRes, isLoading: isNewLoading } = useSongList({ size: 5 });
    const newSongs = newSongsRes?.data || [];

    // 3. Hook phát nhạc
    const { mutate: startPlayerMutation, isPending: isStartingPlayer } = useStartPlayer();

    const handlePlaySong = (e: React.MouseEvent, songId: string) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập để thực hiện tính năng này");
            return;
        }
        if (isCurrentAd) {
            toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
            return;
        }
        if (isStartingPlayer) return;

        startPlayerMutation({ songId });
    };

    const renderSongItem = (song: Song, index: number, isTopColumn: boolean) => {
        const artistName = typeof song.artistId === 'object' ? song.artistId.name : "Nghệ sĩ";

        return (
            <div
                key={song._id}
                onClick={(e) => handlePlaySong(e, song._id)}
                className="flex items-center justify-between p-2 hover:bg-white/10 rounded-md transition-all group cursor-pointer"
            >
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    {isTopColumn && (
                        <div className="flex flex-col items-center w-8 flex-shrink-0">
                            <span className="text-lg font-bold text-white group-hover:hidden">
                                {index + 1}
                            </span>
                            <PlayCircleFilled className="hidden group-hover:block text-green text-xl" />

                            <div className={`text-[10px] flex flex-col items-center group-hover:hidden ${index % 2 === 0 ? 'text-green' : 'text-red-500'}`}>
                                {index % 2 === 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                <span>{Math.floor(Math.random() * 5) + 1}</span>
                            </div>
                        </div>
                    )}

                    <div className="relative w-12 h-12 flex-shrink-0">
                        {song.imageUrl ? (
                            <img
                                src={song.imageUrl}
                                alt={song.name}
                                className="w-full h-full object-cover rounded shadow-md"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded">
                                <CustomerServiceOutlined className="text-xl text-zinc-500" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col overflow-hidden">
                        <span className="text-white font-semibold truncate group-hover:text-green transition-colors">
                            {song.name || "Unknown Title"}
                        </span>
                        <span className="text-zinc-400 text-sm truncate">{artistName}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end ml-4 flex-shrink-0">
                    <span className="text-zinc-500 text-sm font-mono">
                        {song.duration ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}` : "--:--"}
                    </span>
                    {isTopColumn && (
                        <span className="text-[10px] text-zinc-600">
                            {(song as any).views?.toLocaleString() || (song as any).listenCount?.toLocaleString()} views
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 p-6 bg-transparent">
            {/* Cột bên trái: Top singles (Week) */}
            <section>
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-3">
                        <CustomerServiceOutlined className="text-green text-2xl" />
                        <h2 className="text-2xl font-bold text-white tracking-tight">Top singles</h2>
                    </div>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Bảng xếp hạng tuần</span>
                </div>

                <div className="flex flex-col gap-1 min-h-[200px]">
                    {isTopLoading ? (
                        <ListSkeleton />
                    ) : weekTopSongs.length > 0 ? (
                        weekTopSongs.slice(0, 5).map((song, index) => renderSongItem(song, index, true))
                    ) : (
                        <div className="py-4">
                            <EmptyState 
                                title="Bảng xếp hạng đang cập nhật" 
                                subtitle="Thứ hạng các bài hát sẽ sớm được hiển thị dựa trên lượt nghe của cộng đồng."
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Cột bên phải: New singles */}
            <section>
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-3">
                        <CustomerServiceOutlined className="text-green text-2xl" />
                        <h2 className="text-2xl font-bold text-white tracking-tight">New singles</h2>
                    </div>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Mới nhất</span>
                </div>

                <div className="flex flex-col gap-1 min-h-[200px]">
                    {isNewLoading ? (
                        <ListSkeleton />
                    ) : newSongs.length > 0 ? (
                        newSongs.slice(0, 5).map((song, index) => renderSongItem(song, index, false))
                    ) : (
                        <div className="py-4">
                            <EmptyState 
                                title="Chưa có bài hát mới" 
                                subtitle="Các bài hát mới nhất từ nghệ sĩ sẽ xuất hiện tại đây."
                            />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}