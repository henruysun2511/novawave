"use client";
import { useToast } from "@/libs/toast";
import { useAdvertisementDetail } from "@/queries/useAdvertisementQuery";
import { useArtistDetail } from "@/queries/useArtistQuery";
import { useFollow, useUnfollow, useUserFollow } from "@/queries/useFollowQuery";
import { useSongDetail } from "@/queries/useSongQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { LoadingOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";



// Giả định cấu trúc Advertisement Detail (từ API response của bạn)
interface AdvertisementDetail {
    _id: string;
    title: string;
    description: string;
    partner: string;
    audioUrl: string;
    bannerUrl: string;
    // ... các trường khác
}

export default function SongInfo() {
    const hidePanel = useSidebarStore((s) => s.hideRightPanel);
    const toast = useToast();
    const currentUser = useAuthStore((state) => state.user);

    const { status } = usePlayerStore();
    const { nowPlaying } = status;
    // Lấy type hiện tại: 'song' hoặc 'advertisement'
    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
    const isCurrentAd = nowPlayingType === 'advertisement';


    // 1. Query chi tiết BÀI HÁT (chỉ chạy nếu type là 'song')
    const { data: songRes, isLoading: songLoading } = useSongDetail(
        nowPlaying && !isCurrentAd ? nowPlaying : ""
    );
    const currentSong = songRes?.data;

    // 2. Query chi tiết QUẢNG CÁO (chỉ chạy nếu type là 'advertisement')
    const { data: adRes, isLoading: adLoading } = useAdvertisementDetail(
        nowPlaying && isCurrentAd ? nowPlaying : ""
    );
    const currentAd = adRes?.data as AdvertisementDetail;

    // 3. Query chi tiết nghệ sĩ chính (chỉ chạy khi là bài hát)
    const artistId =
        typeof currentSong?.artistId === "string" && !isCurrentAd ? currentSong.artistId : undefined;
    const { data: artistRes, isLoading: artistLoading } = useArtistDetail(artistId);
    const currentArtist = artistRes?.data;

    // 4. Lấy danh sách nghệ sĩ mà người dùng đang theo dõi (chỉ cần nếu là bài hát)
    const { data: FollowRes } = useUserFollow({
        page: 1,
        size: 100,
    });

    // 5. Mutations cho Follow/Unfollow (chỉ cần nếu là bài hát)
    const { mutate: followArtist, isPending: isFollowingMutate } = useFollow();
    const { mutate: unfollowArtist, isPending: isUnfollowingMutate } = useUnfollow();
    const isMutating = isFollowingMutate || isUnfollowingMutate;


    const getInitial = (name: string | undefined): string => {
        return name ? name.charAt(0).toUpperCase() : 'N/A';
    };

    const checkIsFollowing = (artistId: string | undefined): boolean => {
        if (!artistId || !FollowRes?.data) return false;
        return FollowRes.data.some((f: any) => f.artistId._id === artistId);
    };

    const isMainArtistFollowing = checkIsFollowing(currentArtist?._id);

    // Hàm xử lý Toggle Follow (chỉ áp dụng cho bài hát)
    const handleToggleFollow = (artistId: string, artistName: string, isFollowed: boolean) => {
        if (isCurrentAd) return; //Bỏ qua nếu là quảng cáo

        if (!currentUser) {
            toast.error("Vui lòng đăng nhập");
            return;
        }

        if (!artistId) return;

        if (isFollowed) {
            unfollowArtist(artistId, {
                onSuccess: (res) => {
                    toast.success(res.data.message || `Đã bỏ theo dõi ${artistName}`);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Bỏ theo dõi thất bại");
                },
            });
        } else {
            followArtist(artistId, {
                onSuccess: (res) => {
                    toast.success(res.data.message || `Đã theo dõi ${artistName}`);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Theo dõi thất bại");
                },
            });
        }
    };


    if (songLoading || artistLoading || adLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-[var(--background-secondary)] rounded-2xl">
                <LoadingOutlined className="text-3xl text-text-primary animate-spin" />
            </div>
        );
    }

    if (!nowPlaying || (!currentSong && !currentAd)) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full p-5 bg-[var(--background-secondary)] rounded-2xl text-text-primary">
                <h1 className="text-xl">Không có bài hát nào đang phát.</h1>
                <Tooltip title="Ẩn chế độ xem Đang phát" placement="right">
                    <MenuFoldOutlined
                        className="absolute top-5 left-5 z-20 text-text-primary cursor-pointer"
                        onClick={hidePanel}
                    />
                </Tooltip>
            </div>
        );
    }


    const mainTitle = isCurrentAd
        ? currentAd?.title || "Quảng Cáo"
        : currentSong?.name || "Đang cập nhật";

    const subTitle = isCurrentAd
        ? `Được tài trợ bởi ${currentAd?.partner || "..."}`
        : currentArtist?.name || "Đang cập nhật";

    const bannerUrl = isCurrentAd
        ? currentAd?.bannerUrl || "/videos/Download.mp4"
        : currentArtist?.bannerUrl;

    const hasBannerImage = !!(isCurrentAd ? currentAd?.bannerUrl : currentArtist?.bannerUrl);


    return (
        <div className="bg-[var(--background-secondary)] rounded-2xl overflow-scroll scrollbar-hidden w-full h-full">

            {/* Banner (Ảnh hoặc Video) */}
            <div className=" relative h-[450px]">
                {hasBannerImage ? (
                    <img
                        className="w-full h-full object-cover"
                        src={bannerUrl as string}
                        alt={mainTitle + " Banner"}
                    />
                ) : (
                    // Dùng video fallback khi không có banner (cả song và ad)
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                    >
                        <source src="/videos/Download.mp4" type="video/mp4" />
                    </video>
                )}

                {/* Nút Ẩn */}
                <Tooltip title="Ẩn chế độ xem Đang phát" placement="right">
                    <MenuFoldOutlined
                        className="absolute top-5 left-5 z-20 text-white cursor-pointer"
                        onClick={hidePanel}
                    />
                </Tooltip>
            </div>


            {/* Thông tin chính */}
            <div className="w-full p-5 -mt-[130px] relative z-10">
                <h1 className="text-3xl text-text-primary uppercase font-extrabold mb-1.5">
                    {mainTitle}
                </h1>
                <h3 className="text-base text-text-primary mb-6 font-extrabold">{subTitle}</h3>

                {!isCurrentAd && currentArtist ? (
                    <div className="gap-4 bg-[var(--background-secondary)] rounded-xl my-1.5 shadow-lg">

                        {/* Avatar / Fallback */}
                        {currentArtist.avatarUrl ? (
                            <img
                                className="w-full h-64 object-cover rounded-t-xl"
                                src={currentArtist.avatarUrl}
                                alt={currentArtist.name || "Nghệ sĩ"}
                            />
                        ) : (
                            <div
                                className="w-full h-64 rounded-t-xl bg-green flex items-center justify-center text-white text-4xl font-bold"
                            >
                                {getInitial(currentArtist.name)}
                            </div>
                        )}

                        <div className="bg-[var(--background-tertiary)] rounded-b-xl p-4">
                            <div className="flex items-center justify-between mb-1.5">
                                <h3 className="text-base text-text-primary font-extrabold">{currentArtist.name || "Đang cập nhật"}</h3>

                                <button
                                    onClick={() => handleToggleFollow(currentArtist._id, currentArtist.name, isMainArtistFollowing)}
                                    disabled={isMutating || !currentArtist._id}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 cursor-pointer
                                        ${isMainArtistFollowing
                                            ? "bg-green text-white hover:bg-green/90 border border-green"
                                            : "border border-green text-green hover:bg-green hover:text-white"
                                        }`}
                                >
                                    {isMutating ? (
                                        <LoadingOutlined className="animate-spin" />
                                    ) : isMainArtistFollowing ? (
                                        <>Bỏ theo dõi</>
                                    ) : (
                                        <>Theo dõi</>
                                    )}
                                </button>
                            </div>
                            <p className="text-sm text-text-primary mb-2">
                                9.876.752 lượt nghe hàng tháng
                            </p>
                            <p className="text-sm text-gray-400 line-clamp-5">
                                {currentArtist.biography || "Tiểu sử đang được cập nhật."}
                            </p>
                        </div>
                    </div>
                ) : isCurrentAd ? (
                    <div className="bg-[var(--background-tertiary)] rounded-xl my-1.5 p-4 shadow-lg">
                        <h3 className="text-xl text-text-primary font-extrabold mb-2">Quảng Cáo</h3>
                        <div className="space-y-1">
                            <p className="text-base font-semibold text-white truncate">
                                {currentAd?.title || "Đang cập nhật quảng cáo"}
                            </p>

                            <p className="text-base text-gray-400 italic">
                                {currentAd?.partner || "Đối tác chưa xác định"}
                            </p>

                            <p className="text-base text-gray-300 line-clamp-2">
                               {currentAd?.description ?? "Không có mô tả cho quảng cáo này."}
                            </p>
                        </div>

                    </div>
                ) : null}


                {/* --- NGHỆ SĨ CÙNG THAM GIA (CHỈ HIỂN THỊ KHI LÀ BÀI HÁT) --- */}
                {!isCurrentAd && currentSong && (
                    <div className="bg-[var(--background-tertiary)] rounded-xl my-3 p-4 shadow-lg">
                        <h3 className="text-base text-text-primary font-extrabold mb-3">Nghệ sĩ cùng tham gia</h3>

                        {currentSong.featArtists && currentSong.featArtists.length > 0 ? (
                            currentSong.featArtists.map((artist: any) => { // ⚠️ Điều chỉnh type `artist`
                                const isFeatArtistFollowing = checkIsFollowing(artist._id);

                                return (
                                    <div
                                        key={artist._id}
                                        className="flex items-center justify-between mb-3 last:mb-0"
                                    >
                                        <h3 className="text-base text-text-primary">{artist.name}</h3>

                                        {/* NÚT THEO DÕI NGHỆ SĨ HỢP TÁC */}
                                        <button
                                            onClick={() => handleToggleFollow(artist._id, artist.name, isFeatArtistFollowing)}
                                            disabled={isMutating || !artist._id}
                                            className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 cursor-pointer
                                                ${isFeatArtistFollowing
                                                    ? "bg-green text-white hover:bg-green/90 border border-green"
                                                    : "border border-green text-green hover:bg-green hover:text-white"
                                                }`}
                                        >
                                            {isMutating ? (
                                                <LoadingOutlined className="animate-spin" />
                                            ) : isFeatArtistFollowing ? (
                                                <>Bỏ theo dõi</>
                                            ) : (
                                                <>Theo dõi</>
                                            )}
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-400">Không có nghệ sĩ nào cùng tham gia.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}




