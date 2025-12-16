"use client";
import Footer from "@/components/client/footer/footer";
import PlaylistAddSongModal from "@/components/client/Playlist/playlist-add-song-modal";
import ReportModal from "@/components/client/Report/report-modal";
import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { usePlaylistDetail, usePlaylistsSong, useRemoveSongFromPlaylist, useUserPlaylists } from "@/queries/usePlaylistQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto } from "@/types/body.type";
import { ReportTargetType } from "@/types/constant.type";
import { CaretRightFilled, FlagOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function PlaylistDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [openAddSong, setOpenAddSong] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const toast = useToast();

    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
    const isCurrentAd = nowPlayingType === 'advertisement';


    const { data: playlistRes, isLoading: playlistLoading } = usePlaylistDetail(id);
    const playlist = playlistRes?.data;

    const { data: songRes } = usePlaylistsSong(id);
    const songs = songRes?.data ?? [];

    // Kiểm tra playlist có thuộc user hiện tại không
    const { data: userPlaylistRes } = useUserPlaylists();
    const userPlaylists = userPlaylistRes?.data ?? [];

    // Kiểm tra playlist hiện tại có trong danh sách của user không
    const isUserPlaylist = userPlaylists.some(p => p._id === id);


    const { mutate: startPlayerMutation, isPending: isStartingPlayer } = useStartPlayer();

    //Xử lý ảnh
    const imgs = songs.filter(song => song?.imageUrl).slice(0, 3);

    const renderImages = () => {
        const count = imgs.length;
        if (count === 0) {
            return (
                <div className="flex items-center justify-center w-full h-full text-6xl font-bold text-white bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-xl">
                    {playlist?.name?.[0]?.toUpperCase()}
                </div>
            );
        }

        if (count === 1) {
            return (
                <img
                    className="w-[300px] h-[300px] rounded-xl mx-auto my-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src={imgs[0]?.imageUrl}
                    alt=""
                />
            );
        }

        if (count === 2) {
            return (
                <>
                    <img
                        className="w-[130px] h-[130px] rounded-full absolute top-1/2 left-[25%] transform -translate-y-1/2 -translate-x-1/2"
                        src={imgs[0]?.imageUrl}
                        alt=""
                    />
                    <img
                        className="w-[130px] h-[130px] rounded-full absolute top-1/2 left-[75%] transform -translate-y-1/2 -translate-x-1/2"
                        src={imgs[1]?.imageUrl}
                        alt=""
                    />
                </>
            );
        }

        if (count === 3) {
            return (
                <>
                    <img
                        className="w-[120px] h-[120px] rounded-full absolute top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                        src={imgs[0]?.imageUrl}
                        alt=""
                    />
                    <img
                        className="w-[150px] h-[150px] rounded-full absolute top-[50%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
                        src={imgs[1]?.imageUrl}
                        alt=""
                    />
                    <img
                        className="w-[200px] h-[200px] rounded-full absolute top-[70%] left-[80%] transform -translate-x-1/2 -translate-y-1/2"
                        src={imgs[2]?.imageUrl}
                        alt=""
                    />
                </>
            );
        }
    };

    const { mutate: removeSong, isPending: isRemovingSong } = useRemoveSongFromPlaylist();
    const playlistId = id;
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

    const handlePlayPlaylist = () => {
        if (isCurrentAd) {
            toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
            return;
        }
        if (!songs || songs.length === 0) {
            toast.info("Playlist này chưa có bài hát nào!");
            return;
        }

        if (isStartingPlayer) return;


        const nowPlayingId = songs[0]?._id;

        if (!nowPlayingId) {
            toast.error("Không tìm thấy thông tin bài hát để phát.");
            return;
        }

        const payload: PlayerDto = {
            songId: nowPlayingId,
            playlistId: id,
        };

        startPlayerMutation(payload, {
            onSuccess: (res) => {
                toast.success(`Đang phát playlist: ${playlist?.name}`);
                console.log(res);
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Không thể phát playlist");
            },
        });
    };

    if (playlistLoading) return <div>Đang tải...</div>;
    if (!playlist) return <div>Không tìm thấy Playlist.</div>;


    return (
        <>
            <div className="relative w-full h-[400px]">
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full flex gap-5 items-end">
                    <div className="relative w-[300px] h-[300px] overflow-hidden rounded-xl bg-green-950">
                        {renderImages()}
                    </div>
                    <div>
                        <div className="text-base text-white mt-5 mb-3">
                            Playlist
                        </div>
                        <h3 className="uppercase text-7xl font-extrabold text-white mb-5 hover:text-green transition">
                            {playlist?.name}
                        </h3>
                        <div className="text-base text-white mb-3 font-bold">
                            {playlist?.description || "Đang cập nhật mô tả"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-10">
                    {/*Nút Play Playlist */}
                    <div
                        className={`cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg transition ${isStartingPlayer ? 'opacity-70' : 'hover:scale-105'}`}
                        onClick={handlePlayPlaylist}
                    >
                        {isStartingPlayer ? (
                            <LoadingOutlined className="text-3xl text-black animate-spin" />
                        ) : (
                            <CaretRightFilled className="text-3xl" />
                        )}
                    </div>

                    {isUserPlaylist && (
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                             transition duration-200 hover:bg-green hover:text-white"
                            onClick={() => setOpenAddSong(true)}
                        >
                            <PlusOutlined className="mr-2" />Thêm bài hát mới
                        </div>
                    )}

                    <div
                        className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                         transition duration-200 hover:bg-green hover:text-white"
                        onClick={() => setIsReportModalOpen(true)}
                    >
                        <FlagOutlined className="mr-2" />Report
                    </div>
                </div>

                <Title>Thông tin bài hát</Title>
                <table className="w-full text-left border-collapse text-base">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-3">STT</th>
                            <th className="py-3">Tên bài hát</th>
                            <th className="py-3">Thời lượng</th>
                            {isUserPlaylist && <th className="py-3">Hành động</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {songs.length > 0 ? (
                            songs.map((song, index) => (
                                <tr
                                    key={song?._id || index}
                                    className="hover:bg-[var(--background-tertiary)] transition text-text-primary"
                                >
                                    <td className="py-3">{index + 1}</td>
                                    <td className="py-3 flex items-center gap-4">
                                        <img
                                            className="w-[50px] h-[50px] object-cover rounded"
                                            src={song?.imageUrl || "/images/default-cover.png"}
                                            alt={song?.name || "Song"}
                                        />
                                        {song?.name || "Đang cập nhật"}
                                    </td>
                                    <td className="py-3">
                                        {song?.duration
                                            ? `${Math.floor(song.duration / 60)}:${String(
                                                Math.floor(song.duration % 60)
                                            ).padStart(2, "0")}`
                                            : "Đang cập nhật"}
                                    </td>
                                    {isUserPlaylist && (
                                        <td className="py-3">
                                            <Popconfirm
                                                title="Xóa bài hát khỏi playlist?"
                                                okText="Xóa"
                                                cancelText="Hủy"
                                                onConfirm={() => song._id && handleRemove(song._id)}
                                            >
                                                <button
                                                    className={`text-red-500 hover:text-red-700 cursor-pointer ${isRemovingSong ? 'opacity-50' : ''}`}
                                                    disabled={isRemovingSong}
                                                >
                                                    {isRemovingSong ? 'Đang xóa...' : 'Xóa'}
                                                </button>
                                            </Popconfirm>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3 + (isUserPlaylist ? 1 : 0)} className="py-5 text-center text-gray-500">
                                    Playlist này chưa có bài hát nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Footer />

            <ReportModal
                open={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={id}
                targetType={ReportTargetType.PLAYLIST}
            />

            <PlaylistAddSongModal
                open={openAddSong}
                playlistId={id}
                onCancel={() => setOpenAddSong(false)}
            />
        </>
    );
}
