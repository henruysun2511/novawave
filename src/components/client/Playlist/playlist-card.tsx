import { Playlist } from "@/types/object.type";
import { useRouter } from "next/navigation";
import PlaylistImage from "./playlist-image";

interface Props {
    playlist: Playlist;
}

export default function PlaylistCard({ playlist }: Props) {
    const router = useRouter();

    const handleGoDetail = () => {
        router.push(`/playlist/${playlist._id}`);
    };


    return (
        <>
            <div onClick={handleGoDetail} className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl p-2 transition  hover:bg-white/5">

                {/* Ảnh */}
                <div className="relative w-[180px] h-[180px]">
                    <PlaylistImage playlist={playlist} />
                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2 truncate w-full" onClick={handleGoDetail}>
                    {playlist?.name}
                </a>

            </div>
        </>
    );
}