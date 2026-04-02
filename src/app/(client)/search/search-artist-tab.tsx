import ArtistSearchItem from "./search-artist-item";

export default function SearchArtistTab({ artists }: { artists: any[] }) {
  if (!artists || artists.length === 0) {
    return (
      <div className="text-text-primary italic mt-10">
        Không tìm thấy album phù hợp
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {artists.map((artist) => (
        <ArtistSearchItem key={artist._id} artist={artist} />
      ))}
    </div>
  );
}