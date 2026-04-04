import TopArtist from "@/components/client/Artist/top-artist";
import Title from "@/components/common/title";
import { useTopArtists } from "@/queries/useArtistQuery";
import { Spin } from "antd";

export default function TopArtistDashboard() {
    const { data, isLoading } = useTopArtists();
    const artists = data?.data;

    if (isLoading) return <Spin size="large" />;

    return (
        <div className="bg-[var(--background-secondary)] p-8 rounded-2xl">
            <Title>🔥 Top 10 nghệ sĩ phổ biến</Title>

            <div className="flex flex-col gap-6 mt-6">
                {artists?.map((artist: any, index: number) => (
                    <TopArtist
                        key={artist._id}
                        rank={index + 1}
                        artist={artist}
                    />
                ))}
            </div>
        </div>
    );
}
