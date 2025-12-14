import SongSearchItem from "./search-song-item";

export function SearchSongTab({ songs }: { songs: any[] }) {
  return (
    <div className="space-y-6">
      {songs.map((song) => (
        <SongSearchItem key={song._id} song={song} />
      ))}
    </div>
  );
}