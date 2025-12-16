import { useToast } from "@/libs/toast";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto } from "@/types/body.type";
import { PlaySongType } from "@/types/constant.type";
import { Song } from "@/types/object.type";
import { CaretRightFilled, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface Props {
    song: Song;
}

export default function SongCard({ song }: Props) {
    const artistName = (song.artistId as any)?.name;
    const toast = useToast();
    const router = useRouter();

    const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
    const isCurrentAd = nowPlayingType === PlaySongType.ADVERTISEMENT;

    const handleGoDetail = () => {
        router.push(`/song/${song._id}`);
    };

    const { mutate: startPlayerMutation, isPending: isStartingPlayer } = useStartPlayer();
    const handlePlaySong = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isCurrentAd) {
            toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
            return;
        }

        if (isStartingPlayer) return;

        const payload: PlayerDto = {
            songId: song._id,
        };

        startPlayerMutation(payload, {
            onSuccess: () => {
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Không thể phát nhạc");
            },
        });
    };

    return (
        <>
            <div className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">

                {/* Ảnh */}
                <div className="relative w-full h-full">

                    {song.imageUrl ? (
                        <img
                            className="w-[180px] h-[180px] object-cover rounded-xl"
                            src={song.imageUrl}
                            alt={song.name}
                        />
                    ) : (
                        <div
                            className="w-[160px] h-[180px] rounded-xl flex items-center justify-center bg-gray-600 text-white text-7xl font-bold"
                            title={song.name}
                        >
                            {song.name ? song.name.charAt(0).toUpperCase() : '?'}
                        </div>
                    )}
                    {/* Overlay mờ khi hover */}
                    <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                    {/* Nút play */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                        <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg"
                            onClick={handlePlaySong}>
                            {isStartingPlayer ? (
                                <LoadingOutlined className="text-xl text-white animate-spin" />
                            ) : (
                                <CaretRightFilled className="text-3xl text-black" />
                            )}
                        </div>
                    </div>

                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2" onClick={handleGoDetail}>
                    {song.name}
                </a>
                <a className="text-sm text-gray-400">{artistName}</a>

            </div>
        </>
    );
}