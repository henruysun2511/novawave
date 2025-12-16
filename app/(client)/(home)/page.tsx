"use client";
import AlbumList from "@/components/client/AlbumList/album-list";
import ArtistList from "@/components/client/ArtistList/artist-list";
import EventList from "@/components/client/EventList/event-list";
import Footer from "@/components/client/footer/footer";
import NewsList from "@/components/client/NewsList/news-list";
import SongList from "@/components/client/SongList/song-list";
import SongList2 from "@/components/client/SongList/song-list-2";
import SquareSkeleton from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { useAlbumList } from "@/queries/useAlbumQuery";
import { useArtistList } from "@/queries/useArtistQuery";
import { useSongList } from "@/queries/useSongQuery";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AdvertisementBanner from "./advertisement-banner";
import TopSong from "./top-song";

export default function HomePage() {
    const router = useRouter();

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

    return (
        <>
            <div className="p-6">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={1}
                    className="mySwiper"
                    pagination={{ clickable: true }}
                    speed={600}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide><AdvertisementBanner /></SwiperSlide>
                    <SwiperSlide><AdvertisementBanner /></SwiperSlide>
                    <SwiperSlide><AdvertisementBanner /></SwiperSlide>
                </Swiper>

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



                {/* <div className="mt-16 flex justify-between items-center">
                    <Title>Mới phát hành</Title>
                    <a className="text-base text-text-secondary">Xem tất cả</a>
                </div>
                <NewSongList /> */}

                <div className="mt-16 flex justify-between items-center">
                    <Title>Album nổi bật</Title>
                    <a className="text-base text-text-secondary" onClick={() => router.push('album')}>Xem tất cả</a>
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


                <div className="mt-16 flex justify-between items-center">
                    <Title>Bảng xếp hạng nhạc mới</Title>
                    <a className="text-base text-text-secondary">Xem tất cả</a>
                </div>
                <TopSong />


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



                <div className="mt-16 flex justify-between items-center">
                    <img src="https://yt3.googleusercontent.com/JQX_ukIzqNX53iRAnrs7EbDfrWqs5uhyxg_xpoIaERGvIdXz5nh-0c2k9ea_9EQijmmF-gy3Ew=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
                </div>

                <div className="mt-16 flex justify-between items-center">
                    <Title>Sự kiện âm nhạc sắp tới</Title>
                    <a className="text-base text-text-secondary">Xem tất cả</a>
                </div>
                <EventList />


                <div className="mt-16 flex justify-between items-center">
                    <Title>Tin tức mới nhất</Title>
                    <a className="text-base text-text-secondary">Xem tất cả</a>
                </div>
                <NewsList />



                <div className="mt-16 flex justify-between items-center">
                    <img src=" https://yt3.googleusercontent.com/SCRkFwhAbYkvTcSod-rMsK5hER4ljSYFxxPBeXPgpmER8MLxQQSh_dmfgNeVTuUxalHT8ynpEA=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
                </div>
            </div>
            <Footer />

        </>
    )
}