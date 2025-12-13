import Title from "@/components/ui/title";
import { useAlbumListByArtist } from "@/queries/useAlbumQuery";
import { useArtistProfile } from "@/queries/useArtistQuery";
import ArtistAlbumTable from "./artist-album-table";

export default function ArtistAlbum() {
    const { data: artistUserData } = useArtistProfile();
    const { data: albumData, isPending } = useAlbumListByArtist(artistUserData?.data?._id ?? "");
    console.log(albumData)

    return (
        <>
            <Title>Danh sách album của tôi</Title>
            <ArtistAlbumTable data={albumData?.data ?? []} loading={isPending}/>
        </>
    )
}