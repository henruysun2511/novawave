import GenreSearchItem from "./search-genre-item";

export default function SearchGenreTab({ genres }: { genres: any[] }) {
  if (!genres || genres.length === 0) {
    return (
      <div className="text-text-primary italic mt-10">
        Không tìm thấy thể loại phù hợp
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {genres.map((g) => (
        <GenreSearchItem key={g._id} genre={g} />
      ))}
    </div>
  );
}