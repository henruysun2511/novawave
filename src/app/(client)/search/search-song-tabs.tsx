import SongSearchItem from "./search-song-item";

export function SearchSongTab({ songs}: { songs: any[]}) {
  if (!songs || songs.length === 0) {
    return (
      <div className="text-text-primary italic mt-10">
        Không tìm thấy bài hát phù hợp
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {songs.map((song) => (
        <SongSearchItem key={song._id} song={song}/>
      ))}
    </div>
  );
}