"use client";

import AlbumCard from "@/components/client/Album/album-card";
import ArtistCard from "@/components/client/Artist/artist-card";
import ReportModal from "@/components/client/Report/report-modal";
// import WavePlayer from "@/components/client/WavePlayer/wave-player";
import Loading from "@/components/common/loading";
import NotFoundUI from "@/components/common/not-found-ui";
import Title from "@/components/common/title";
import { useToast } from "@/hooks/useToast";
import { useCommentList } from "@/queries/useCommentQuery";
import { useLikeSong, useUnlikeSong, useUserLike } from "@/queries/useLikeQuery";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { useSongDetail } from "@/queries/useSongQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlaySongType, ReportTargetType } from "@/types/constant.type";
import type { Comment } from "@/types/object.type";
import { CaretRightFilled, FlagOutlined, HeartFilled, HeartOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import dynamic from 'next/dynamic';
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import LyricsPreview from "../lyrics-preview";
import SongAddPlaylistModal from "./song-add-playlist-modal";
import SongComment from "./song-comment";

const WavePlayer = dynamic(() => import('@/components/client/WavePlayer/wave-player'), {
    ssr: false
});

export default function SongDetailPage() {
    const [isMounted, setIsMounted] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    const currentTime = usePlayerStore((state) => state.currentTime);
    const { nowPlayingId, nowPlaying } = usePlayerStore(state => state.status);
    const seekToTime = usePlayerStore((state) => state.seekToTime);
    const getAudioRef = useCallback(() => usePlayerStore.getState().audioRef, []);
    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const toast = useToast();

    // Các hook React Query - Giữ ở cấp cao nhất
    const { data: songRes, isLoading } = useSongDetail(id);
    const { data: commentsForWave } = useCommentList(String(id), { page: 1 });
    const { data: likeRes } = useUserLike({ page: 1, size: 100 });
    const { mutate: likeSong } = useLikeSong();
    const { mutate: unlikeSong } = useUnlikeSong();
    const { mutate: startPlayerMutation, isPending: isStartingPlayer } = useStartPlayer();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // LOGIC TÍNH TOÁN: Đặt sau các Hook
    const song = songRes?.data;
    const currentPlayingId = nowPlayingId || (nowPlaying && typeof nowPlaying !== 'string' ? nowPlaying._id : nowPlaying);
    const isThisSongCurrentlyPlaying = song?._id === currentPlayingId;
    const isLiked = likeRes?.data?.some((l: any) => l.songId?._id === song?._id);
    const isCurrentAd = nowPlayingType === PlaySongType.ADVERTISEMENT;

    // const handleToggleLike = () => {
    //     if (!user) {
    //         toast.error("Vui lòng đăng nhập");
    //         return;
    //     }
    //     if (!song) return; // Bảo vệ nếu song chưa load

    //     if (isLiked) {
    //         unlikeSong(song._id, {
    //             onSuccess: (res: any) => toast.success(res?.data?.message || "Đã bỏ thích"),
    //             onError: (err: any) => toast.error(err?.response?.data?.message || "Bỏ thích thất bại"),
    //         });
    //     } else {
    //         likeSong(song._id, {
    //             onSuccess: (res: any) => toast.success(res?.data?.message || "Đã thích bài hát"),
    //             onError: (err: any) => toast.error(err?.response?.data?.message || "Thích bài hát thất bại"),
    //         });
    //     }
    // };

    const [optimisticLiked, setOptimisticLiked] = useState(false);
    const [optimisticCount, setOptimisticCount] = useState(0);

    useEffect(() => {
        setOptimisticLiked(isLiked ?? false);
        setOptimisticCount(song?.likesCount ?? 0);
    }, [isLiked, song?.likesCount]);

    const handleToggleLike = () => {
        if (!user) { toast.error("Vui lòng đăng nhập"); return; }
        if (!song) return;

        if (optimisticLiked) {
            // Optimistic unlike
            setOptimisticLiked(false);
            setOptimisticCount(prev => prev - 1);
            unlikeSong(song._id, {
                onError: (err: any) => {
                    setOptimisticLiked(true);       // rollback
                    setOptimisticCount(prev => prev + 1);
                    toast.error(err?.response?.data?.message || "Thất bại");
                }
            });
        } else {
            // Optimistic like
            setOptimisticLiked(true);
            setOptimisticCount(prev => prev + 1);
            likeSong(song._id, {
                onError: (err: any) => {
                    setOptimisticLiked(false);      // rollback
                    setOptimisticCount(prev => prev - 1);
                    toast.error(err?.response?.data?.message || "Thất bại");
                }
            });
        }
    };

    const handlePlaySong = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập để thực hiện tính năng này");
            return;
        }
        if (isCurrentAd) {
            toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
            return;
        }
        if (isStartingPlayer || !song) return;

        startPlayerMutation({ songId: song._id });
    };

    const commentMarkers = useMemo(() => {
        const rows = (commentsForWave?.data ?? []) as Comment[];
        return rows
            .filter((c): c is Comment & { playbackPositionSec: number } =>
                typeof c.playbackPositionSec === "number" && c.playbackPositionSec >= 0
            )
            .map((c) => ({
                id: c._id,
                timeSec: c.playbackPositionSec,
                avatarUrl: c.userId?.avatar,
            }));
    }, [commentsForWave]);

    const scheduleSeekAfterPlay = useCallback(
        (targetSec: number) => {
            let attempts = 0;
            const tick = () => {
                const audio = getAudioRef();
                if (audio && audio.readyState >= 1) {
                    seekToTime(targetSec);
                    return;
                }
                attempts += 1;
                if (attempts < 40) {
                    window.setTimeout(tick, 50);
                } else {
                    seekToTime(targetSec);
                }
            };
            window.setTimeout(tick, 0);
        },
        [getAudioRef, seekToTime]
    );

    const handleWaveSeek = useCallback(
        (newTime: number) => {
            if (!song) return;
            if (song._id === currentPlayingId) {
                seekToTime(newTime);
                return;
            }
            if (!isAuthenticated) {
                toast.error("Vui lòng đăng nhập để tua bài hát");
                return;
            }
            if (isCurrentAd) {
                toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
                return;
            }
            if (isStartingPlayer) return;
            startPlayerMutation(
                { songId: song._id },
                {
                    onSuccess: () => {
                        scheduleSeekAfterPlay(newTime);
                    },
                }
            );
        },
        [
            song,
            currentPlayingId,
            seekToTime,
            isAuthenticated,
            toast,
            isCurrentAd,
            isStartingPlayer,
            startPlayerMutation,
            scheduleSeekAfterPlay,
        ]
    );

    // CHẶN RENDER: Chỉ khi đã Hydrate và có dữ liệu
    if (!isMounted || isLoading) return <Loading />;

    if (!song)
        return (
            <NotFoundUI
                message="Không tìm thấy Bài hát"
                description="Bài hát bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
                backUrl="/song"
                backText="Xem danh sách bài hát"
            />
        );

    return (
        <>
            {/* Header Hero Section */}
            <div className="relative w-full h-auto md:h-[350px]">
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-3 md:gap-5 flex flex-col md:flex-row items-center justify-center md:items-center p-4 md:p-6">
                    {/* COVER */}
                    <img
                        className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-xl flex-shrink-0 object-cover"
                        src={song?.imageUrl || "/images/default-cover.png"}
                        alt=""
                    />

                    {/* INFO + WAVE */}
                    <div className="relative z-20 flex-1 min-w-0 text-center md:text-left">
                        <div className="text-xs md:text-base text-white mt-3 md:mt-5 mb-2 md:mb-3">
                            Đĩa đơn
                        </div>

                        <h3 className="uppercase text-2xl md:text-4xl lg:text-6xl font-extrabold text-white mb-1 line-clamp-3">
                            {song?.name || "Đang cập nhật"}
                        </h3>

                        <div className="text-xs md:text-base text-white mb-3 md:mb-4 font-bold line-clamp-2">
                            {song?.artistId?.name || "Đang cập nhật"}
                        </div>

                        {/* WAVE */}
                        <div className="w-full max-w-sm md:max-w-none">
                            <WavePlayer
                                songId={song._id}
                                url={song?.mp3Link}
                                currentTime={isThisSongCurrentlyPlaying ? currentTime : 0}
                                onSeek={handleWaveSeek}
                                alwaysShowWave
                                commentMarkers={commentMarkers}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-4 md:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-6 md:mb-10 flex-wrap">
                        <div className="cursor-pointer w-12 h-12 md:w-15 md:h-15 rounded-full bg-green flex items-center justify-center shadow-lg flex-shrink-0"
                            onClick={handlePlaySong}>
                            {isStartingPlayer ? (
                                <LoadingOutlined className="text-lg md:text-xl text-white animate-spin" />
                            ) : (
                                <CaretRightFilled className="text-2xl md:text-3xl text-black" />
                            )}
                        </div>
                        <div
                            onClick={handleToggleLike}
                            className="border border-green rounded-full text-text-primary text-xs md:text-base px-3 md:px-5 py-1 md:py-1 cursor-pointer
             transition duration-200 hover:bg-green hover:text-white flex items-center flex-shrink-0"
                        >
                            {isLiked ? (
                                <HeartFilled className="mr-2 text-red-500" />
                            ) : (
                                <HeartOutlined className="mr-2" />
                            )}
                            <span className="hidden sm:inline">Yêu thích</span>
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-xs md:text-base px-3 md:px-5 py-1 md:py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white flex-shrink-0"
                            onClick={() => setIsPlaylistModalOpen(true)}
                        >
                            <PlusOutlined className="mr-2" /><span className="hidden sm:inline">Thêm vào playlist</span>
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-xs md:text-base px-3 md:px-5 py-1 md:py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white flex-shrink-0"
                            onClick={() => setIsReportModalOpen(true)}
                        >
                            <FlagOutlined className="mr-2" /><span className="hidden sm:inline">Report</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 md:gap-5 mb-6 md:mb-10 text-text-secondary text-xs md:text-base justify-center md:justify-end flex-wrap">
                        <div className="flex items-center">
                            <CaretRightFilled className="mr-2" />
                            <span className="truncate">{song?.playCount ?? "Đang cập nhật"}</span>
                        </div>

                        <div className="flex items-center">
                            <HeartFilled className="mr-2" />
                            <span className="truncate">{song?.likesCount ?? "Đang cập nhật"}</span>
                        </div>
                    </div>
                </div>

                <Title>Thông tin bài hát</Title>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-base">
                        <thead>
                            <tr className="text-gray-400">
                                <th className="py-3">STT</th>
                                <th className="py-3">Tên bài hát</th>
                                <th className="py-3">Album</th>
                                <th className="py-3">Nghệ sĩ</th>
                                <th className="py-3">Thời lượng</th>
                                <th className="py-3">Ngày phát hành</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="hover:bg-[var(--background-tertiary)] transition text-text-primary">
                                <td className="py-3">1</td>

                                <td className="py-3 flex items-center gap-4">
                                    <img
                                        className="w-[50px] h-[50px] object-cover rounded"
                                        src={song?.imageUrl || "/images/default-cover.png"}
                                        alt=""
                                    />
                                    <p>{song?.name || "Đang cập nhật"}</p>
                                </td>

                                <td className="py-3">
                                    {song?.album?.name || "Đang cập nhật"}
                                </td>

                                <td className="py-3">
                                    {song?.artistId?.name || "Đang cập nhật"}
                                </td>

                                <td className="py-3">
                                    {song?.duration
                                        ? `${Math.floor(song.duration / 60)}:${String(Math.floor(song.duration % 60)).padStart(2, "0")}`
                                        : "Đang cập nhật"}
                                </td>

                                <td className="py-3">
                                    {song?.createdAt
                                        ? new Date(song.createdAt).toISOString().split('T')[0]
                                        : "Đang cập nhật"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden bg-[var(--background-tertiary)] rounded-lg p-4 space-y-3">
                    <div className="flex gap-4">
                        <img
                            className="w-[80px] h-[80px] object-cover rounded flex-shrink-0"
                            src={song?.imageUrl || "/images/default-cover.png"}
                            alt=""
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-text-secondary text-xs mb-1">Tên bài hát</p>
                            <p className="text-text-primary font-bold line-clamp-2">{song?.name || "Đang cập nhật"}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-text-secondary text-xs mb-1">Album</p>
                        <p className="text-text-primary">{song?.album?.name || "Đang cập nhật"}</p>
                    </div>
                    <div>
                        <p className="text-text-secondary text-xs mb-1">Nghệ sĩ</p>
                        <p className="text-text-primary">{song?.artistId?.name || "Đang cập nhật"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-text-secondary text-xs mb-1">Thời lượng</p>
                            <p className="text-text-primary">
                                {song?.duration
                                    ? `${Math.floor(song.duration / 60)}:${String(Math.floor(song.duration % 60)).padStart(2, "0")}`
                                    : "Đang cập nhật"}
                            </p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-xs mb-1">Ngày phát hành</p>
                            <p className="text-text-primary">
                                {song?.createdAt
                                    ? new Date(song.createdAt).toISOString().split('T')[0]
                                    : "Đang cập nhật"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="my-6 md:my-10"></div>
                <Title>Nghệ sĩ</Title>
                <ArtistCard artist={song.artistId} />

                <div className="my-6 md:my-10"></div>
                <Title>Nghệ sĩ cùng tham gia</Title>
                {song?.featArtists && song.featArtists.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                        {song.featArtists.map((artist) => (
                            <ArtistCard key={artist._id} artist={artist} />
                        ))}
                    </div>
                ) : (
                    <div className="text-base text-text-primary">
                        Không có nghệ sĩ khác tham gia
                    </div>
                )}

                <div className="my-6 md:my-10"></div>
                <Title>Album</Title>
                {song?.album ? (
                    <AlbumCard album={song.album} />
                ) : (<div className="text-base text-text-primary">
                    Không có album
                </div>)}

                <div className="my-6 md:my-10"></div>
                <Title>Lời bài hát</Title>
                <LyricsPreview lyrics={song?.lyrics || "Đang cập nhật"} />
                <div className="my-6 md:my-10"></div>

                <SongComment songId={song._id} />
            </div>

            <ReportModal
                open={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={id}
                targetType={ReportTargetType.SONG}
            />


            <SongAddPlaylistModal
                isOpen={isPlaylistModalOpen}
                onClose={() => setIsPlaylistModalOpen(false)}
                songId={song._id}
            />
        </>
    )
}