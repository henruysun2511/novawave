import AlbumList from "@/components/client/AlbumList/album-list";
import ArtistCard from "@/components/client/ArtistList/artist-card";
import SongList from "@/components/client/SongList/song-list";
import Title from "@/components/ui/title";
import { useAlbumListByArtist } from "@/queries/useAlbumQuery";
import { useSongListByArtist } from "@/queries/useSongQuery";

export default function ArtistSearchItem({ artist }: { artist: any }) {
    const { data: songs } = useSongListByArtist(artist._id);
    const { data: albums } = useAlbumListByArtist(artist._id);

    const keyword = localStorage.getItem("keyword");

    return (
        <div>
            <Title>{`Nghệ sĩ ${keyword}`}</Title>
            <ArtistCard artist={artist} />

            <Title>{`Danh sách bài hát của nghệ sĩ ${keyword}`}</Title>
            <SongList songs={songs?.data ?? []} />

            <Title>{`Album của nghệ sĩ ${keyword}`}</Title>
            <AlbumList albums={albums?.data ?? []} />
        </div>
    );
}