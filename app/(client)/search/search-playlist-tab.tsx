import PlaylistCard from "@/components/client/Playlist/playlist-card";
import Title from "@/components/ui/title";

export default function SearchPlaylistTab({ playlists }: { playlists: any[] }) {
  if (!playlists || playlists.length === 0) {
    return (
      <div className="text-text-primary italic mt-10">
        Không tìm thấy playlist phù hợp
      </div>
    );
  }
  const keyword = localStorage.getItem("keyword");
  return (
    <>
      <Title>{`Danh sách playlist ${keyword}`}</Title>
      {
        playlists.map((p) => (
          <PlaylistCard key={p._id} playlist={p} />
        ))
      }
    </>
  )

}