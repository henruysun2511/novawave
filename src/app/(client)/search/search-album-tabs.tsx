import AlbumSearchItem from "./search-album-item";


export default function SearchAlbumTab({ albums }: { albums: any[] }) {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-text-primary italic mt-10">
        Không tìm thấy album phù hợp
      </div>
    );
  }
  return albums.map((album) => (
    <AlbumSearchItem key={album._id} album={album} />
  ));
}