"use client";

import AlbumCard from "@/components/client/AlbumList/album-card";
import ArtistCard from "@/components/client/ArtistList/artist-card";
import ReportModal from "@/components/client/Report/report-modal";
import { WavePlayer } from "@/components/client/WavePlayer/wave-player";
import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { useLikeSong, useUnlikeSong, useUserLike } from "@/queries/useLikeQuery";
import { useSongDetail } from "@/queries/useSongQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { ReportTargetType } from "@/types/constant.type";
import { CaretRightFilled, FlagOutlined, HeartFilled, HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { useParams } from "next/navigation";
import { useState } from "react";
import LyricsPreview from "../lyrics-preview";
import SongAddPlaylistModal from "./song-add-playlist-modal";
import SongComment from "./song-comment";
const { TextArea } = Input;

export default function SongDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const toast = useToast();

    const { data: songRes, isLoading } = useSongDetail(id);
    const user = useAuthStore((state) => state.user);

    const { data: likeRes } = useUserLike({
        page: 1,
        size: 100,
    });

    const { mutate: likeSong } = useLikeSong();
    const { mutate: unlikeSong } = useUnlikeSong();

    if (isLoading) return <div>Loading...</div>;
    if (!songRes?.data) return <div>Không tìm thấy bài hát</div>;
    const song = songRes.data;

    const isLiked = likeRes?.data?.some(
        (l: any) => l.songId?._id === song._id
    );

    const handleToggleLike = () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập");
            return;
        }

        if (isLiked) {
            unlikeSong(song._id, {
                onSuccess: (res: any) =>
                    toast.success(res?.data?.message || "Đã bỏ thích"),
                onError: (err: any) =>
                    toast.error(err?.response?.data?.message || "Bỏ thích thất bại"),
            });
        } else {
            likeSong(song._id, {
                onSuccess: (res: any) =>
                    toast.success(res?.data?.message || "Đã thích bài hát"),
                onError: (err: any) =>
                    toast.error(err?.response?.data?.message || "Thích bài hát thất bại"),
            });
        }
    };

    const handleOpenPlaylistModal = () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để thêm vào Playlist");
            return;
        }
        setIsPlaylistModalOpen(true);
    }


    return (
        <>
            <div className="relative w-full h-[350px]">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7c2d12]" /> */}

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-5 flex items-center p-4">
                    <img className="w-[300px] h-[300px] rounded-xl" src={song?.imageUrl || "/images/default-cover.png"} alt="" />
                    <div className="relative z-20">
                        <div className="text-base text-white mt-5 mb-3">
                            Đĩa đơn
                        </div>
                        <h3 className="uppercase text-6xl font-extrabold text-white mb-1 hover:text-green transition">
                            {song?.name || "Đang cập nhật"}
                        </h3>
                        <div className="text-base text-white mb-3 font-bold">
                            {song?.artist.name}
                        </div>
                        <WavePlayer url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-3xl" />
                        </div>
                        <div
                            onClick={handleToggleLike}
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
             transition duration-200 hover:bg-green hover:text-white flex items-center"
                        >
                            {isLiked ? (
                                <HeartFilled className="mr-2 text-red-500" />
                            ) : (
                                <HeartOutlined className="mr-2" />
                            )}
                            Yêu thích
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                                 onClick={() => setIsPlaylistModalOpen(true)}
                        >
                            <PlusOutlined className="mr-2" />Thêm vào playlist
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                            onClick={() => setIsReportModalOpen(true)}
                        >
                            <FlagOutlined className="mr-2" />Report
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mb-10 text-text-secondary text-base">
                        <div>
                            <CaretRightFilled className="mr-2" />
                            {song?.playCount ?? "Đang cập nhật"}
                        </div>

                        <div>
                            <HeartFilled className="mr-2" />
                            {song?.likesCount ?? "Đang cập nhật"}
                        </div>
                    </div>
                </div>

                <Title>Thông tin bài hát</Title>
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
                                    className="w-[50px] h-[50px] object-cover"
                                    src={song?.imageUrl || "/images/default-cover.png"}
                                    alt=""
                                />
                                <p>{song?.name || "Đang cập nhật"}</p>
                            </td>

                            <td className="py-3">
                                {song?.album?.name || "Đang cập nhật"}
                            </td>

                            <td className="py-3">
                                {song?.artist?.name || "Đang cập nhật"}
                            </td>

                            <td className="py-3">
                                {song?.duration
                                    ? `${Math.floor(song.duration / 60)}:${String(Math.floor(song.duration % 60)).padStart(2, "0")}`
                                    : "Đang cập nhật"}
                            </td>

                            <td className="py-3">
                                {song?.createdAt
                                    ? new Date(song.createdAt).toLocaleDateString("vi-VN")
                                    : "Đang cập nhật"}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="my-10"></div>
                <Title>Nghệ sĩ</Title>
                <ArtistCard artist={song.artist} />

                <div className="my-10"></div>
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

                <div className="my-10"></div>
                <Title>Album</Title>
                {song?.album ? (
                    <AlbumCard album={song.album} />
                ) : (<div className="text-base text-text-primary">
                    Không có album
                </div>)}



                <div className="my-10"></div>
                <Title>Lời bài hát</Title>
                <LyricsPreview lyrics={song?.lyrics || "Đang cập nhật"} />



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