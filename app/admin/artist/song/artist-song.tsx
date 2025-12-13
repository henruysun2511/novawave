import Title from "@/components/ui/title";
import { useArtistProfile } from "@/queries/useArtistQuery";
import { useSongListByArtist } from "@/queries/useSongQuery";
import ArtistSongTable from "./artist-song-table";

export default function ArtistSong() {
    const { data: artist } = useArtistProfile();
    const artistId = artist?.data?._id ?? "";
    const { data: songData, isPending } = useSongListByArtist(artistId);


    return (
        <>
            <Title>Danh sách bài hát của tôi</Title>
            <ArtistSongTable loading={isPending} data={songData?.data ?? []}/>
        </>
    );
}
