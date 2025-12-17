"use client";
import AlbumCard from "@/components/client/AlbumList/album-card";
import Footer from "@/components/client/footer/footer";
import ReportModal from "@/components/client/Report/report-modal";
import SongList from "@/components/client/SongList/song-list";
import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { useAlbumListByArtist } from "@/queries/useAlbumQuery";
import { useArtistDetail } from "@/queries/useArtistQuery";
import { useFollow, useUnfollow, useUserFollow } from "@/queries/useFollowQuery";
import { useSongListByArtist } from "@/queries/useSongQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { ReportTargetType } from "@/types/constant.type";
import { Album } from "@/types/object.type";
import { CaretRightFilled, FlagOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

export default function ArtistDetailPage() {
    const { id } = useParams<{ id: string }>();
    const toast = useToast();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const { data: artistRes, isLoading } = useArtistDetail(id);
    const artist = artistRes?.data;

    const currentUser = useAuthStore((state) => state.user);

    const { data: FollowRes } = useUserFollow({
        page: 1,
        size: 100,
    });

    const { mutate: followArtist, isPending: isFollowingMutate } = useFollow();
    const { mutate: unfollowArtist, isPending: isUnfollowingMutate } = useUnfollow();

    const isMutating = isFollowingMutate || isUnfollowingMutate;

    const isFollowing = FollowRes?.data?.some(
        (f: any) => f.artistId._id === artist?._id
    );


    const handleToggleFollow = () => {
        if (!currentUser) {
            toast.error("Vui lòng đăng nhập");
            return;
        }

        if (!artist?._id) return;

        if (isFollowing) {
            unfollowArtist(artist._id, {
                onSuccess: (res) => {
                    toast.success(res.data.message);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Bỏ theo dõi thất bại");
                },
            });
        } else {
            followArtist(artist._id, {
                onSuccess: (res) => {
                    toast.success(res.data.message);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Theo dõi thất bại");
                },
            });
        }
    };

    const { data: songRes } = useSongListByArtist(id);
    const songs = songRes?.data;

    const { data: albumRes } = useAlbumListByArtist(id);
    const albums = albumRes?.data;

    if (isLoading) return <div>Đang tải...</div>;
    if (!artist) return <div>Không tìm thấy Nghệ sĩ.</div>;

    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src={artist?.bannerUrl || "/images/default-banner.jpg"}
                    alt={artist?.name || "Artist banner"}
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        {artist?.followers ?? "Đang cập nhật"} lượt theo dõi
                    </div>

                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        {artist?.name || "Đang cập nhật"}
                    </h3>
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-10">
                    <div className="cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg">
                        <CaretRightFilled className="text-3xl" />
                    </div>

                    <button
                        onClick={handleToggleFollow}
                        disabled={isMutating}
                        className={`flex items-center gap-2 border rounded-full text-base px-5 py-1 transition cursor-pointer
                        ${isFollowing
                                ? "border-green bg-green text-white hover:bg-green/90"
                                : "border-green text-text-primary hover:bg-green hover:text-white"}
                           `}>
                        {isMutating ? (
                            "Đang xử lý..."
                        ) : isFollowing ? (
                            <>
                                <UserDeleteOutlined />
                                Bỏ theo dõi
                            </>
                        ) : (
                            <>
                                <UserAddOutlined />
                                Theo dõi
                            </>
                        )}
                    </button>
                    <div
                        className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200 
                                 hover:bg-green hover:text-white"
                        onClick={() => setIsReportModalOpen(true)}
                    >
                        <FlagOutlined className="mr-2" />Report
                    </div>
                </div>


                <Title>Phổ biến</Title>
                <table className="w-full text-left border-collapse text-base">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-3">STT</th>
                            <th className="py-3">Tên bài hát</th>
                            <th className="py-3">Album</th>
                            <th className="py-3">Lượt nghe</th>
                            <th className="py-3">Thời lượng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {songs && songs.length > 0 ? (
                            songs.map((song: any, index: number) => (
                                <tr
                                    key={song._id}
                                    className="hover:bg-[var(--background-tertiary)] transition text-text-primary"
                                >
                                    {/* STT */}
                                    <td className="py-3">{index + 1}</td>

                                    {/* Tên bài hát */}
                                    <td className="py-3 flex items-center gap-4">
                                        <img
                                            className="w-[50px] h-[50px] object-cover rounded"
                                            src={song?.imageUrl || "/images/default-cover.png"}
                                            alt={song?.name || "Song"}
                                        />
                                        <p>{song?.name || "Đang cập nhật"}</p>
                                    </td>
                                    <td className="py-3">
                                        {song?.album?.name || "Đang cập nhật"}
                                    </td>
                                    <td className="py-3">
                                        {song?.listenCount !== undefined
                                            ? song.listenCount.toLocaleString("vi-VN")
                                            : "Đang cập nhật"}
                                    </td>
                                    <td className="py-3">
                                        {song?.duration
                                            ? `${Math.floor(song.duration / 60)}:${String(
                                                Math.floor(song.duration % 60)
                                            ).padStart(2, "0")}`
                                            : "Đang cập nhật"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-5 text-center text-gray-500">
                                    Chưa có bài hát
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="mt-10 mb-5">
                    <Title>Giới thiệu</Title>
                </div>
                <div className="flex gap-5 justify-center items-center">
                    <div className="">
                        <div className="mb-10">
                            <h3 className="text-text-primary text-3xl font-extrabold mb-1"> {artist?.playerCount ?? "16.750.000"}</h3>
                            <p className="text-text-primary">Lượt nghe</p>
                        </div>
                        <div>
                            <h3 className="text-text-primary text-3xl font-extrabold mb-1">{artist?.country || "Đang cập nhật"}</h3>
                            <p className="text-text-primary">Quốc gia</p>
                        </div>
                    </div>
                    <img className="h-[500px] w-[500px] rounded-2xl object-cover" src={artist?.avatarUrl} alt={artist?.name} />
                    <div>
                        <p className="text-gray-500 text-base"> {artist?.name || "Đang cập nhật"}</p>
                        <h3 className="text-text-primary text-3xl font-extrabold mb-1">Tiểu sử</h3>
                    </div>

                </div>

                <div className="mt-15 mb-5">
                    <Title>Danh sách đĩa nhạc</Title>
                    {songs && songs.length > 0 ? (
                        <SongList songs={songs} />
                    ) : (
                        <div className="text-gray-500">Chưa có bài hát nào</div>
                    )}
                </div>

                <div className="mt-15 mb-5">
                    <Title>Album</Title>
                    <div className="flex flex-wrap gap-3">
                        {albums && albums.length > 0 ? (
                            albums.map((album: Album) => (
                                <AlbumCard key={album._id} album={album} />
                            ))
                        ) : (
                            <p className="text-gray-500">Chưa có album</p>
                        )}
                    </div>
                </div>

            </div>
            <Footer />

            <ReportModal
                open={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={id}
                targetType={ReportTargetType.ARTIST}
            />
        </>
    );
}