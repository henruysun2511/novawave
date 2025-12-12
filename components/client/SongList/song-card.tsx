import { Song } from "@/types/object.type";
import { CaretRightFilled } from "@ant-design/icons";

interface Props {
    song: Song;
}

export default function SongCard({song}: Props) {
    return (
        <>
            <div className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">

                {/* Ảnh */}
                <div className="relative w-full h-full">

                    <img
                        className="w-[180px] h-[180px] object-cover rounded-xl"
                        src={song.imageUrl}
                        alt={song.name}
                    />

                    {/* Overlay mờ khi hover */}
                    <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                    {/* Nút play */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                        <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-3xl"/>
                        </div>
                    </div>

                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2">
                    {song.name}
                </a>
                <a className="text-sm text-gray-400">{song.artistId.name}</a>

            </div>
        </>
    );
}