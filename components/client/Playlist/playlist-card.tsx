import { Playlist } from "@/types/object.type";
import { useRouter } from "next/navigation";

interface Props {
    playlist: Playlist;
}

export default function PlaylistCard({ playlist }: Props) {
    const router = useRouter();

    const handleGoDetail = () => {
        router.push(`/playlist/${playlist._id}`);
    };

    const getBgColor = (id: string) => {
        const bgColors = [
            "bg-red-600", "bg-blue-600", "bg-purple-600", "bg-pink-600", "bg-indigo-600",
            "bg-teal-600", "bg-orange-600", "bg-cyan-600", "bg-emerald-600", "bg-rose-600"
        ];
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return bgColors[Math.abs(hash) % bgColors.length];
    };

    const renderImages = () => {
        const imgs = playlist.songImages || [];
        const count = imgs.length;
        const bgColor = getBgColor(playlist._id);

        if (playlist.img) {
            return (
                <img
                    className={`w-[180px] h-[180px] object-cover rounded-xl ${bgColor}`}
                    src={playlist.img}
                    alt={playlist.name}
                />
            );
        }

        if (count === 0) {
            return (
                <div
                    className={`w-[180px] h-[180px] rounded-xl flex items-center justify-center text-white text-4xl font-bold ${bgColor}`}
                >
                    {playlist?.name?.charAt(0).toUpperCase()}
                </div>
            );
        }

        if (count === 1) {
            return (
                <img
                    className={`w-[180px] h-[180px] object-cover rounded-xl ${bgColor}`}
                    src={imgs[0]}
                    alt=""
                />
            );
        }

        if (count === 2) {
            return (
                <div className={`relative w-[180px] h-[180px] rounded-xl overflow-hidden ${bgColor}`}>
                    <img
                        className="w-[90px] h-[90px] rounded-full absolute top-1/2 left-[25%] transform -translate-y-1/2 -translate-x-1/2"
                        src={imgs[0]}
                        alt=""
                    />
                    <img
                        className="w-[90px] h-[90px] rounded-full absolute top-1/2 left-[75%] transform -translate-y-1/2 -translate-x-1/2"
                        src={imgs[1]}
                        alt=""
                    />
                </div>
            );
        }

        if (count === 3) {
            return (
                <div className={`relative w-[180px] h-[180px] rounded-xl overflow-hidden ${bgColor}`}>
                    <img
                        className="w-[70px] h-[70px] rounded-full absolute top-[15%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                        src={imgs[0]}
                        alt=""
                    />
                    <img
                        className="w-[90px] h-[90px] rounded-full absolute top-[50%] left-[25%] transform -translate-x-1/2 -translate-y-1/2"
                        src={imgs[1]}
                        alt=""
                    />
                    <img
                        className="w-[110px] h-[110px] rounded-full absolute top-[70%] left-[75%] transform -translate-x-1/2 -translate-y-1/2"
                        src={imgs[2]}
                        alt=""
                    />
                </div>
            );
        }
    };

    return (
        <>
            <div onClick={handleGoDetail} className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl p-2 transition  hover:bg-white/5">

                {/* Ảnh */}
                <div className="relative w-[180px] h-[180px]">
                    {renderImages()}
                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2 truncate w-full" onClick={handleGoDetail}>
                    {playlist?.name}
                </a>

            </div>
        </>
    );
}