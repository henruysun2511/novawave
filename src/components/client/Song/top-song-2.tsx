import VerticalRectangleSkeleton from "@/components/common/skeleton/vertical-rectangle-skeleton";
import { useToast } from "@/hooks/useToast";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { useSongLeaderboard } from "@/queries/useSongQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlaySongType } from "@/types/constant.type";
import { CaretRightFilled } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TopSong2() {
    const toast = useToast();
    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
    const isCurrentAd = nowPlayingType === PlaySongType.ADVERTISEMENT;
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const { data, isLoading } = useSongLeaderboard('all');
    const topSongs = data?.data || [];

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

    const getInitial = (name?: string) => {
        if (!name) return "?";
        return name.trim().charAt(0).toUpperCase();
    };



    if (isLoading) {
        return <VerticalRectangleSkeleton />;
    }

    if (topSongs.length === 0) return null;

    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={20}
            navigation
            modules={[Navigation, Autoplay]}
            speed={600}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                0: { slidesPerView: 1.2 },
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
            }}
        >
            {topSongs.map((song, index) => {
                return (
                    <SwiperSlide key={song?._id}>
                        <div className="group">
                            {/* IMAGE */}
                            <div className="relative h-[350px] cursor-pointer">
                                {song?.imageUrl ? (
                                    <img
                                        src={song.imageUrl}
                                        alt={song.name}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-green flex items-center justify-center text-white text-7xl font-extrabold">
                                        {getInitial(song?.name)}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition" />

                                {/* PLAY BUTTON */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                    onClick={(e) => handlePlaySong(e, song._id)}
                                >
                                    <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center shadow-lg hover:scale-110 transition">
                                        <CaretRightFilled className="text-3xl text-black" />
                                    </div>
                                </div>
                            </div>

                            {/* INFO */}
                            <div className="flex items-center gap-4 mt-4">
                                <h1 className="text-6xl font-extrabold text-green italic">
                                    #{index + 1}
                                </h1>
                                <div className="overflow-hidden">
                                    <h3 className="text-lg font-semibold text-text-primary line-clamp-1" title={song?.name}>
                                        {song?.name || "Unknown Title"}
                                    </h3>
                                    <p className="text-text-secondary line-clamp-1">
                                        {song?.genreNames?.length
                                            ? song.genreNames.join(", ")
                                            : "Unknown Genre"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(song.views || song.listenCount || 0).toLocaleString()} lượt nghe
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}