import { Album } from "@/types/object.type";
import { useRouter } from "next/navigation";

interface Props {
    album: Album;
}

export default function AlbumCard({ album }: Props) {
    const router = useRouter();

    const handleGoDetail = () => {
        router.push(`/album/${album._id}`);
    };
    
    return (
        <>
            <div onClick={handleGoDetail} className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">

                {/* Ảnh */}
                <div className="relative w-full h-full">
                    {album?.img ? (
                        <img
                            className="w-[180px] h-[180px] object-cover rounded-xl"
                            src={album?.img}
                            alt={album?.name}
                        />
                    ) : (
                        <div
                            className="w-[160px] h-[180px] rounded-xl
                       bg-green flex items-center justify-center
                       text-white text-4xl font-bold"
                        >
                            {album?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {/* Overlay mờ khi hover */}
                    <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>
                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2" onClick={handleGoDetail}>
                    {album?.name}
                </a>

            </div>
        </>
    );
}