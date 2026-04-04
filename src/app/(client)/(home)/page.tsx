"use client";

import AlbumList from "@/components/client/Album/album-list";
import ArtistList from "@/components/client/Artist/artist-list";
import MainBanner from "@/components/client/Banner/main-banner";
import CommentSwiper from "@/components/client/Comment/comment-swiper";
import Footer from "@/components/client/Layout/footer";
import NewsList from "@/components/client/News/news-list";
import PlaylistList from "@/components/client/Playlist/playlist-list";
import SongList from "@/components/client/Song/song-list";
import SongList2 from "@/components/client/Song/song-list-2";
import TopSong2 from "@/components/client/Song/top-song-2";
import TopSong3 from "@/components/client/Song/top-song-3";
import { EmptyState } from "@/components/common/empty";
import SquareSkeleton from "@/components/common/skeleton/square-skeleton";
import Title from "@/components/common/title";
import { useAlbumList } from "@/queries/useAlbumQuery";
import { useArtistList } from "@/queries/useArtistQuery";
import { useNewsList } from "@/queries/useNewsQuery";
import { usePlaylistList } from "@/queries/usePlaylistQuery";
import { useSettings } from "@/queries/useSettingQuery";
import { useSongList } from "@/queries/useSongQuery";
import { NewsStatus } from "@/types/constant.type";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // --- FETCH DATA ---
  const { data: settingsRes } = useSettings();
  const miniBanners = settingsRes?.data?.miniBanner || [];

  const { data: songData, isPending: isPending } = useSongList({ size: 8 });
  const songs = songData?.data || [];

  const { data: songPopData, isPending: isPopPending } = useSongList({ size: 8, genreNames: ["Pop"] });
  const songPops = songPopData?.data || [];

  const { data: songRockData, isPending: isRockPending } = useSongList({ size: 8, genreNames: ["Rock"] });
  const songRocks = songRockData?.data || [];

  const { data: songBalladData, isPending: isBalladPending } = useSongList({ size: 8, genreNames: ["Ballad"] });
  const songBallads = songBalladData?.data || [];

  const { data: artistData, isPending: isArtistPending } = useArtistList({ size: 8 });
  const artists = artistData?.data || [];

  const { data: albumData, isPending: isAlbumPending } = useAlbumList({});
  const albums = albumData?.data || [];

  const { data: playlistData, isPending: isPlaylistPending } = usePlaylistList({ size: 10 });
  const playlists = playlistData?.data || [];

  const { data: newsData, isPending: isNewsPending } = useNewsList({
    size: 3,
    status: NewsStatus.PUBLISHED,
  });
  const news = newsData?.data || [];

  return (
    <>
      <div className="p-6">
        <MainBanner />

        {/* --- DÀNH CHO BẠN --- */}
        <section className="mt-16">
          <Title>Dành cho bạn</Title>
          <div className="mt-6">
            {isPending ? (
              <SquareSkeleton />
            ) : songs.length > 0 ? (
              <SongList2 songs={songs} />
            ) : (
              <EmptyState title="Chưa có bài hát nào dành cho bạn" subtitle="Hãy khám phá thêm nhiều bài hát để chúng tôi hiểu gu âm nhạc của bạn hơn." />
            )}
          </div>
        </section>

        {/* --- NHẠC POP --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Nhạc Pop trẻ trung năng động</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('genre')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isPopPending ? (
              <SquareSkeleton />
            ) : songPops.length > 0 ? (
              <SongList songs={songPops} />
            ) : (
              <EmptyState title="Giai điệu Pop đang được cập nhật" />
            )}
          </div>
        </section>

        {/* --- NHẠC ROCK --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Cháy cùng rock</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('genre')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isRockPending ? (
              <SquareSkeleton />
            ) : songRocks.length > 0 ? (
              <SongList songs={songRocks} />
            ) : (
              <EmptyState title="Nhạc Rock chưa có mặt tại đây" />
            )}
          </div>
        </section>

        {/* --- NHẠC BALLAD --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Thất tình à? Mở Ballad nghe nhé!</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('genre')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isBalladPending ? (
              <SquareSkeleton />
            ) : songBallads.length > 0 ? (
              <SongList songs={songBallads} />
            ) : (
              <EmptyState title="Ballad đang vắng bóng" subtitle="Đừng buồn, những giai điệu nhẹ nhàng sẽ sớm trở lại." />
            )}
          </div>
        </section>

        {/* --- BẢNG XẾP HẠNG --- */}
        <section className="mt-16">
          <Title>Bảng xếp hạng nhiều lượt nghe nhất</Title>
          <div className="mt-6">
            <TopSong2 />
          </div>
        </section>

        {/* --- PLAYLIST --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Playlist dành cho bạn</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('/playlist')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isPlaylistPending ? (
              <SquareSkeleton />
            ) : playlists.length > 0 ? (
              <PlaylistList playlists={playlists} />
            ) : (
              <EmptyState title="Chưa có playlist nào được tạo" />
            )}
          </div>
        </section>

        {/* --- ALBUM --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Album nổi bật</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('/album')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isAlbumPending ? (
              <SquareSkeleton />
            ) : albums.length > 0 ? (
              <AlbumList albums={albums} />
            ) : (
              <EmptyState title="Danh sách album đang trống" />
            )}
          </div>
        </section>

        {/* --- MINI BANNER 1 --- */}
        {miniBanners.length > 1 && (
          <div className="mt-20 mb-10">
            <div
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all hover:opacity-95"
              onClick={() => miniBanners[1].redirectLink && router.push(miniBanners[1].redirectLink)}
            >
              <img
                src={miniBanners[1].imageUrl}
                alt={miniBanners[1].title || "promotion"}
                className="w-full h-[150px] object-cover md:aspect-[4/1]"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        )}

        {/* --- CỘNG ĐỒNG & BXH PHỤ --- */}
        <section className="mt-16">
          <Title>Bình luận từ cộng đồng</Title>
          <div className="mt-8">
            <CommentSwiper />
          </div>
        </section>

        <div className="py-10">
          <TopSong3 />
        </div>

        {/* --- NGHỆ SĨ --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Nghệ sĩ nổi bật</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('artist')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isArtistPending ? (
              <SquareSkeleton />
            ) : artists.length > 0 ? (
              <ArtistList artists={artists} />
            ) : (
              <EmptyState title="Chưa có nghệ sĩ nào" />
            )}
          </div>
        </section>

        {/* --- TIN TỨC --- */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <Title>Tin tức mới nhất</Title>
            <button className="text-base text-text-secondary hover:text-emerald-500 transition-colors" onClick={() => router.push('/news')}>Xem tất cả</button>
          </div>
          <div className="mt-6">
            {isNewsPending ? (
              <SquareSkeleton />
            ) : news.length > 0 ? (
              <NewsList newsList={news} />
            ) : (
              <EmptyState title="Tin tức đang được cập nhật" />
            )}
          </div>
        </section>

        {/* --- MINI BANNER 0 --- */}
        {miniBanners.length > 0 && (
          <div className="mt-20 mb-10">
            <div
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all hover:opacity-95"
              onClick={() => miniBanners[0].redirectLink && router.push(miniBanners[0].redirectLink)}
            >
              <img
                src={miniBanners[0].imageUrl}
                alt={miniBanners[0].title || "promotion"}
                className="w-full h-[150px] object-cover md:aspect-[4/1]"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}