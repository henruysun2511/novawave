import SongList from "@/components/client/SongList/song-list";
import Title from "@/components/ui/title";
import { useSongList } from "@/queries/useSongQuery";
import { getRandomColor } from "../genre/page";

export default function GenreSearchItem({ genre }: { genre: any }) {
  const { data: songs } = useSongList({
    genreNames: [genre.name],
  });

  return (

    <div>
      <Title>Thể loại</Title>
      <div
        key={genre._id}
        className={`cursor-pointer relative rounded-lg overflow-hidden 
                        h-[180px] w-[180px] 
                        group transition-transform hover:scale-[1.02] 
                        ${getRandomColor()}`}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>

        <div className="absolute bottom-4 left-4 z-10">
          <h4 className="text-2xl font-bold text-white uppercase">
            {genre.name}
          </h4>
        </div>
      </div>

      <Title>Danh sách bài hát thuộc thể loại</Title>
      <SongList songs={songs?.data ?? []} />
    </div>
  );
}