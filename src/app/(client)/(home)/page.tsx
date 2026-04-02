"use client";
import AlbumList from "@/components/client/AlbumList/album-list";
import ArtistList from "@/components/client/ArtistList/artist-list";
import CommentSwiper from "@/components/client/CommentSwiper/comment-swiper";
import Footer from "@/components/client/footer/footer";
import MainBanner from "@/components/client/MainBanner/main-banner";
import NewsList from "@/components/client/NewsList/news-list";
import PlaylistList from "@/components/client/Playlist/playlist-list";
import SongList from "@/components/client/SongList/song-list";
import SongList2 from "@/components/client/SongList/song-list-2";
import TopSong2 from "@/components/client/SongList/top-song-2";
import TopSong3 from "@/components/client/SongList/top-song-3";
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

    const { data: settingsRes } = useSettings();
    const miniBanners = settingsRes?.data?.miniBanner || [];

    const { data: songData, isPending } = useSongList({
        size: 8
    });
    const songs = songData?.data || [];

    const { data: songPopData, isPending: isPopPending } = useSongList({
        size: 8,
        genreNames: ["Pop"]
    });
    const songPops = songPopData?.data || [];

    const { data: songRockData, isPending: isRockPending } = useSongList({
        size: 8,
        genreNames: ["Rock"]
    });
    const songRocks = songRockData?.data || [];

    const { data: songBalladData, isPending: isBalladPending } = useSongList({
        size: 8,
        genreNames: ["Ballad"]
    });
    const songBallads = songBalladData?.data || [];

    const { data: artistData, isPending: isArtistPending } = useArtistList({
        size: 8
    })
    const artists = artistData?.data || [];

    const { data: albumData, isPending: isAlbumPending } = useAlbumList({
    })
    const albums = albumData?.data || [];


    const { data: playlistData, isPending: isPlaylistPending } = usePlaylistList({
        size: 10
    });
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

                <div className="mt-16">
                    <Title>Dành cho bạn</Title>
                </div>
                {
                    songData
                        ? (
                            isPending
                                ? <SquareSkeleton />
                                : <SongList2 songs={songs} />
                        )
                        : <div className="text-text-primary text-base">Chưa có bài hát nào</div>
                }


                <div className="mt-16 flex justify-between items-center">
                    <Title>Nhạc Pop trẻ trung năng động</Title>
                    <a className="text-base text-text-secondary" onClick={() => router.push('genre')}>Xem tất cả</a>
                </div>
                {
                    songPops
                        ? (
                            isPopPending
                                ? <SquareSkeleton />
                                : <SongList songs={songPops} />
                        )
                        : <div className="text-text-primary text-base">Chưa có bài hát nào thuộc thể loại này</div>
                }

                <div className="mt-16 flex justify-between items-center">
                    <Title>Cháy cùng rock</Title>
                    <a className="text-base text-text-secondary" onClick={() => router.push('genre')}>Xem tất cả</a>
                </div>
                {
                    songRocks
                        ? (
                            isRockPending
                                ? <SquareSkeleton />
                                : <SongList songs={songRocks} />
                        )
                        : <div className="text-text-primary text-base">Chưa có bài hát nào thuộc thể loại này</div>
                }

                <div className="mt-16 flex justify-between items-center">
                    <Title>Thất tình à? Mở Ballad nghe nhé!</Title>
                    <a className="text-base text-text-secondary" onClick={() => router.push('genre')}>Xem tất cả</a>
                </div>
                {
                    songBallads
                        ? (
                            isBalladPending
                                ? <SquareSkeleton />
                                : <SongList songs={songBallads} />
                        )
                        : <div className="text-text-primary text-base">Chưa có bài hát nào thuộc thể loại này</div>
                }

                <div className="mt-16 flex justify-between items-center">
                    <Title>Bảng xếp hạng bài hát được nghe nhiều nhất</Title>
                </div>
                <TopSong2 />


                <div className="mt-16 flex justify-between items-center">
                    <Title>Playlist dành cho bạn</Title>
                    <a className="text-base text-text-secondary cursor-pointer" onClick={() => router.push('/playlist')}>Xem tất cả</a>
                </div>
                {
                    playlistData
                        ? (
                            isPlaylistPending
                                ? <SquareSkeleton />
                                : <PlaylistList playlists={playlists} />
                        )
                        : <div className="text-text-primary text-base">Chưa có playlist nào</div>
                }

                <div className="mt-16 flex justify-between items-center">
                    <Title>Album nổi bật</Title>
                    <a className="text-base text-text-secondary cursor-pointer" onClick={() => router.push('/album')}>Xem tất cả</a>
                </div>
                {
                    albumData
                        ? (
                            isAlbumPending
                                ? <SquareSkeleton />
                                : <AlbumList albums={albums} />
                        )
                        : <div className="text-text-primary text-base">Chưa có album nào</div>
                }

                {miniBanners.length > 0 && (
                    <div className="mt-20 mb-10">
                        <div
                            className="relative overflow-hidden rounded-2xl cursor-pointer hover:opacity-95 transition-all group shadow-lg"
                            onClick={() => miniBanners[1].redirectLink && router.push(miniBanners[0].redirectLink)}
                        >
                            <img
                                src={miniBanners[1].imageUrl}
                                alt={miniBanners[1].title || "promotion-banner"}
                                className="w-full h-[150px] object-cover aspect-[21/9] md:aspect-[4/1]"
                            />
                            {/* Hiệu ứng lớp phủ khi di chuột vào */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </div>
                    </div>
                )}


                <div className="mt-16 flex justify-between items-center">
                    <Title>Bình luận từ cộng đồng</Title>
                </div>
                <div className="">
                    <CommentSwiper />
                </div>

                <div className="py-10">
                    <TopSong3 />
                </div>


                <div className="mt-16 flex justify-between items-center">
                    <Title>Nghệ sĩ nổi bật</Title>
                    <a className="text-base text-text-secondary" onClick={() => router.push('artist')}>Xem tất cả</a>
                </div>
                {
                    artistData
                        ? (
                            isArtistPending
                                ? <SquareSkeleton />
                                : <ArtistList artists={artists} />
                        )
                        : <div className="text-text-primary text-base">Chưa có nghệ sĩ nào</div>
                }



                {/* <div className="mt-16 flex justify-between items-center">
                    <Title>Sự kiện âm nhạc sắp tới</Title>
                    <a className="text-base text-text-secondary">Xem tất cả</a>
                </div>
                <EventList /> */}


                <div className="mt-16 flex justify-between items-center">
                    <Title>Tin tức mới nhất</Title>
                    <a className="text-base text-text-secondary" onClick={() => router.push('/news')}>
                        Xem tất cả
                    </a>
                </div>
                {
                    newsData
                        ? (
                            isNewsPending
                                ? <SquareSkeleton />
                                : <NewsList newsList={news} />
                        )
                        : <div className="text-text-primary text-base">Chưa có tin tức nào</div>
                }

                {miniBanners.length > 0 && (
                    <div className="mt-20 mb-10">
                        <div
                            className="relative overflow-hidden rounded-2xl cursor-pointer hover:opacity-95 transition-all group shadow-lg"
                            onClick={() => miniBanners[0].redirectLink && router.push(miniBanners[0].redirectLink)}
                        >
                            <img
                                src={miniBanners[0].imageUrl}
                                alt={miniBanners[0].title || "promotion-banner"}
                                className="w-full h-[150px] object-cover aspect-[21/9] md:aspect-[4/1]"
                            />
                            {/* Hiệu ứng lớp phủ khi di chuột vào */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </div>
                    </div>
                )}
            </div>


            <Footer />

        </>
    )
}