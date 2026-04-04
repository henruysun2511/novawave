import AlbumCard from "@/components/client/Album/album-card";
import ArtistCard from "@/components/client/Artist/artist-card";
import SongList from "@/components/client/Song/song-list";
import Title from "@/components/common/title";
import { useSongsInAlbum } from "@/queries/useAlbumQuery";
import { useArtistDetail } from "@/queries/useArtistQuery";

export default function AlbumSearchItem({ album }: { album: any }) {
  const { data: songs } = useSongsInAlbum(album._id);
  const { data: artistRes } = useArtistDetail(album.artist);

  const artist = artistRes?.data;
  const keyword = localStorage.getItem("keyword");
  return (
    <>
      <Title>{`Album ${keyword}`}</Title>
      <AlbumCard album={album} />

      <Title>{`Nghệ sĩ sở hữu album ${keyword}`}</Title>
      {artist && <ArtistCard artist={artist} />}

      <Title>{`Danh sách bài hát của album ${keyword}`}</Title>
      <SongList songs={songs?.data ?? []} />
    </>
  );
}