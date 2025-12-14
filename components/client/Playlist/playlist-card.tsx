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
    
    return (
        <>
            <div onClick={handleGoDetail} className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">

                {/* Ảnh */}
                <div className="relative w-full h-full">
                    {playlist?.img ? (
                        <img
                            className="w-[180px] h-[180px] object-cover rounded-xl"
                            src={playlist?.img}
                            alt={playlist?.name}
                        />
                    ) : (
                        <div
                            className="w-[180px] h-[180px] rounded-xl
                       bg-green flex items-center justify-center
                       text-white text-4xl font-bold"
                        >
                            {playlist?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2" onClick={handleGoDetail}>
                    {playlist?.name}
                </a>

            </div>
        </>
    );
}