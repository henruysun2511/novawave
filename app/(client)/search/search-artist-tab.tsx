import ArtistSearchItem from "./search-artist-item";

export default function SearchArtistTab({ artists }: { artists: any[] }) {
  return (
    <div className="space-y-8">
      {artists.map((artist) => (
        <ArtistSearchItem key={artist._id} artist={artist} />
      ))}
    </div>
  );
}