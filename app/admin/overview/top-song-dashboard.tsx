import TopSong1 from "@/components/client/SongList/top-song-1";
import Title from "@/components/ui/title";
import { useTopSongs } from "@/queries/useSongQuery";
import { Spin } from "antd";

export default function TopSongDashboard() {
    const { data, isLoading } = useTopSongs();
    const songs = data?.data;
    console.log(songs)

    if (isLoading) return <Spin size="large" />;

    return (
        <div className="bg-[var(--background-secondary)] p-8 rounded-2xl">
            <Title>🔥 Top 10 bài hát được yêu thích nhất</Title>

            <div className="flex flex-col gap-6 mt-6">
                {songs?.map((song: any, index: number) => (
                    <TopSong1
                        key={song._id}
                        rank={index + 1}
                        song={song}
                    />
                ))}
            </div>
        </div>
    );
}
