import { HeartFilled } from "@ant-design/icons";
import Link from "next/link";

interface Props {
    rank: number;
    song: any;
}

const getInitial = (name?: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
};

export default function TopSong1({ rank, song }: Props) {
    if (!song) return null;

    return (
        <Link href={`/song/${song._id}`} className="block">
            <div className="group  relative flex justify-between items-center cursor-pointer rounded-xl px-4 py-3  hover:bg-[var(--background-tertiary)]  transition">
                
    
                {/* CONTENT */}
                <div className="relative z-10 flex justify-between items-center w-full">
                    <div className="flex gap-6 items-center">
                        <div
                            className={`font-extrabold text-5xl ${
                                rank === 1 ? "text-green" : "text-text-secondary"
                            }`}
                        >
                            {rank}
                        </div>

                        {song.imageUrl ? (
                            <img
                                className="w-[70px] h-[70px] object-cover rounded-lg"
                                src={song.imageUrl}
                                alt={song.name}
                            />
                        ) : (
                            <div className="w-[70px] h-[70px] rounded-lg bg-green flex items-center justify-center text-white text-3xl font-bold">
                                {getInitial(song.name)}
                            </div>
                        )}

                        <div>
                            <div className="text-xl font-bold text-text-primary">
                                {song.name}
                            </div>
                            <div className="text-gray-500 text-base">
                                {song.genreNames?.join(", ")}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <div className="text-base text-text-primary">
                            {song.likes}
                        </div>
                        <HeartFilled className="text-green text-xl" />
                    </div>
                </div>
            </div>
        </Link>
    );
}