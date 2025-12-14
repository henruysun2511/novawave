import AlbumSearchItem from "./search-album-item";


export default function SearchAlbumTab({ albums }: { albums: any[] }) {
  return albums.map((album) => (
    <AlbumSearchItem key={album._id} album={album} />
  ));
}