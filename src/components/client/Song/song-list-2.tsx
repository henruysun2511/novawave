import { Song } from "@/types/object.type";
import SongCard from "./song-card";

export default function SongList2({ songs }: { songs: Song[] | undefined }) {
  if (!songs || !Array.isArray(songs) || songs.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {songs.map((song) => (
        <SongCard key={song._id} song={song} />
      ))}
    </div>
  );
}