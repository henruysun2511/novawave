import { Song } from "@/types/object.type";
import SongCard from "./song-card";

export default function SongList2({ songs }: { songs: Song[] }) {
    if (!songs || songs.length === 0) {
        return null;
    }
    return (
        <>
            <div className="flex flex-wrap gap-4">
                {songs?.map((song) => (
                    <SongCard key={song._id} song={song} />
                ))}
            </div>
        </>
    )
}