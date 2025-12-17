"use client";
import { useSearch } from "@/queries/useSearchQuery";
import { Tabs } from "antd";
import { useSearchParams } from "next/navigation";
import SearchAlbumTab from "./search-album-tabs";
import SearchAllTab from "./search-all-tab";
import SearchArtistTab from "./search-artist-tab";
import SearchGenreTab from "./search-genre-tab";
import SearchPlaylistTab from "./search-playlist-tab";
import { SearchSongTab } from "./search-song-tabs";
import "./search.css";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  localStorage.setItem("keyword" ,keyword);

  const { data, isPending } = useSearch(keyword);

  if(!data) return null;
  if (isPending) return null;

  const items = [
    {
      key: "all",
      label: "Tất cả",
      children: <div className="mt-10"><SearchAllTab data={data} /></div>,
    },
    {
      key: "song",
      label: "Bài hát",
      children: <SearchSongTab songs={data.songs}/>,
    },
    {
      key: "artist",
      label: "Nghệ sĩ",
      children: <SearchArtistTab artists={data.artists} />,
    },
    {
      key: "album",
      label: "Album",
      children: <SearchAlbumTab albums={data.albums} />,
    },
    {
      key: "playlist",
      label: "Playlist",
      children: <SearchPlaylistTab playlists={data.playlists} />,
    },
    {
      key: "genre",
      label: "Thể loại",
      children: <SearchGenreTab genres={data.genres} />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-text-primary mb-6">
        Kết quả tìm kiếm cho: {keyword}
      </h1>

      <Tabs
        items={items}
        defaultActiveKey="all"
        tabBarGutter={12}
        className="pill-tabs"
      />
    </div>
  );
}