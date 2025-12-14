import { Song } from "@/types/object.type";
import { CaretRightFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface Props {
    song: Song;
}

export default function SongCard({ song }: Props) {
    const artistName = (song.artistId as any)?.name;
    const router = useRouter();

    const handleGoDetail = () => {
        router.push(`/song/${song._id}`);
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
                        <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-3xl" />
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