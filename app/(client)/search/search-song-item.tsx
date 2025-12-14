import AlbumCard from "@/components/client/AlbumList/album-card";
import ArtistCard from "@/components/client/ArtistList/artist-card";
import SongCard from "@/components/client/SongList/song-card";
import Title from "@/components/ui/title";
import { useAlbumDetail } from "@/queries/useAlbumQuery";
import { useArtistDetail } from "@/queries/useArtistQuery";
import { getRandomColor } from "../genre/page";

export default function SongSearchItem({ song }: { song: any }) {
    const { data: album } = useAlbumDetail(song.albumId);
    const { data: artist } = useArtistDetail(song.artistId)

    const keyword = localStorage.getItem("keyword");

    return (
        <>
            <Title>{`Bài hát ${keyword}`}</Title>
            <SongCard song={song} />

            <Title>{`Nghệ sĩ sở hữu bài hát ${keyword}`}</Title>
            {artist && (<ArtistCard artist={artist?.data} />)}

            <Title>{`Bài hát ${keyword} thuộc album`}</Title>
            {album && <AlbumCard album={album.data} />}

            <Title>{`Danh sách thể loại của bài hát ${keyword}`}</Title>
            <div className="flex gap-4 mt-2">
                {song.genreNames?.map((g: string) => (
                    <div
                        key={g}
                        className={`cursor-pointer relative rounded-lg overflow-hidden 
                  h-[180px] w-[180px] 
                  group transition-transform hover:scale-[1.02] 
                  ${getRandomColor()}`}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>

                        <div className="absolute bottom-4 left-4 z-10">
                            <h4 className="text-2xl font-bold text-white uppercase">
                                {g}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}