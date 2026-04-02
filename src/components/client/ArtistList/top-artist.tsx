import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Props {
    rank: number;
    artist: any;
}

const getInitial = (name?: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
};

export default function TopArtist({ rank, artist }: Props) {
    if (!artist) return null;

    return (
        <Link href={`/artist/${artist._id}`} className="block">
            <div className="group relative flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-[var(--background-tertiary)]  transition">

                <div className="relative z-10 flex justify-between items-center w-full">
                    <div className="flex gap-6 items-center">
                        <div
                            className={`font-extrabold text-5xl ${
                                rank === 1 ? "text-green" : "text-text-secondary"
                            }`}
                        >
                            {rank}
                        </div>

                        {/* Avatar */}
                        {artist.avatarUrl ? (
                            <img
                                src={artist.avatarUrl}
                                alt={artist.name}
                                className="w-[70px] h-[70px] rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-[70px] h-[70px] rounded-full bg-green flex items-center justify-center text-white text-3xl font-bold">
                                {getInitial(artist.name)}
                            </div>
                        )}

                        {/* Info */}
                        <div>
                            <div className="text-xl font-bold text-text-primary mb-0.5">
                                {artist.name}
                            </div>
                            <div className="text-gray-500 text-base">
                                {artist.country || "Nghệ sĩ"}
                            </div>
                        </div>
                    </div>

                    {/* Followers */}
                    <div className="flex gap-2 items-center text-text-primary">
                        <span className="text-base">{artist.followers}</span>
                        <UserOutlined className="text-green text-base"/>
                    </div>
                </div>
            </div>
        </Link>
    );
}