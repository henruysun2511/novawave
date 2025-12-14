import GenreSearchItem from "./search-genre-item";

export default function SearchGenreTab({ genres }: { genres: any[] }) {
  if (!genres.length) return null;

  return (
    <div className="flex flex-col gap-10">
      {genres.map((g) => (
        <GenreSearchItem key={g._id} genre={g} />
      ))}
    </div>
  );
}