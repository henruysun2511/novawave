import { useToast } from "@/libs/toast";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto } from "@/types/body.type";
import { PlaySongType } from "@/types/constant.type";
import { CaretRightFilled } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface TopSongProps {
    songs: any[];
}

const getInitial = (name?: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
};

export default function TopSong2({ songs }: TopSongProps) {
    if (!songs || songs.length === 0) return null;

    const toast = useToast();
    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
    const isCurrentAd = nowPlayingType === PlaySongType.ADVERTISEMENT;

    const { mutate: startPlayerMutation, isPending: isStartingPlayer } =
        useStartPlayer();

    const handlePlaySong = (
        e: React.MouseEvent,
        songId: string
    ) => {
        e.stopPropagation();

        if (isCurrentAd) {
            toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
            return;
        }

        if (isStartingPlayer) return;

        const payload: PlayerDto = { songId };

        startPlayerMutation(payload, {
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.message || "Không thể phát nhạc"
                );
            },
        });
    };

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
            {songs.slice(0, 10).map((song, index) => (
                <SwiperSlide key={song._id}>
                    <div className="group">
                        {/* IMAGE */}
                        <div className="relative h-[350px] cursor-pointer">
                            {song.imageUrl ? (
                                <img
                                    src={song.imageUrl}
                                    alt={song.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full rounded-xl bg-green flex items-center justify-center text-white text-7xl font-extrabold">
                                    {getInitial(song.name)}
                                </div>
                            )}

                            {/* overlay */}
                            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition" />

                            {/* PLAY BUTTON */}
                            <div
                                className="absolute inset-0 flex items-center justify-center
                                           opacity-0 group-hover:opacity-100 transition"
                                onClick={(e) =>
                                    handlePlaySong(e, song._id)
                                }
                            >
                                <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center shadow-lg hover:scale-110 transition">
                                    <CaretRightFilled className="text-3xl text-black" />
                                </div>
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="flex items-center gap-4 mt-4">
                            <h1 className="text-6xl font-extrabold text-green">
                                #{index + 1}
                            </h1>
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary line-clamp-1">
                                    {song.name}
                                </h3>
                                <p className="text-text-secondary line-clamp-1">
                                    {song.genreNames?.length
                                        ? song.genreNames.join(", ")
                                        : "Unknown Genre"}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}