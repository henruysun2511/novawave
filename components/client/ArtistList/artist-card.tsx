import { Artist } from "@/types/object.type";
import { useRouter } from "next/navigation";

interface Props {
    artist: Artist;
}

export default function ArtistCard({ artist }: Props) {
    const router = useRouter();

    const handleGoDetail = () => {
        router.push(`/artist/${artist._id}`);
    };



    return (
        <>
            <div onClick={handleGoDetail} className="group flex flex-col cursor-pointer items-center my-2 w-[180px] rounded-xl p-2">
                {artist?.avatarUrl ? (
                    <img
                        className="w-[130px] h-[130px] object-cover rounded-full"
                        src={artist.avatarUrl}
                        alt={artist.name}
                    />
                ) : (
                    <div
                        className="w-[130px] h-[130px] rounded-full 
                       bg-green flex items-center justify-center
                       text-white text-4xl font-bold"
                    >
                        {artist?.name?.charAt(0).toUpperCase()}
                    </div>
                )}
                <a  className="text-base text-text-primary font-bold mt-2 text-center">
                    {artist?.name}
                </a>
            </div>
        </>
    );
}