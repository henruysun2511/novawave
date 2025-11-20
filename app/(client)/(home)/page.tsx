"use client";
import ArtistList from "@/components/client/ArtistList/artist-list";
import EventList from "@/components/client/EventList/event-list";
import NewsList from "@/components/client/NewsList/news-list";
import SongList from "@/components/client/SongList/song-list";
import Title from "@/components/client/ui/title";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AdvertisementBanner from "./advertisement-banner";
import TopSong from "./top-song";

export default function HomePage() {
    return (
        <>
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
            <SongList />

            <div className="mt-16 flex justify-between items-center">
                <Title>Bảng xếp hạng nhạc mới</Title>
                <a className= "text-base text-text-secondary">Xem tất cả</a>
            </div>
            <TopSong />

            <div className="mt-16 flex justify-between items-center">
                <Title>Nghệ sĩ nổi bật</Title>
                <a className= "text-base text-text-secondary">Xem tất cả</a>
            </div>
            <ArtistList />

            <div className="mt-16 flex justify-between items-center">
                <Title>Sự kiện âm nhạc sắp tới</Title>
                <a className= "text-base text-text-secondary">Xem tất cả</a>
            </div>
            <EventList />

            <div className="mt-16 flex justify-between items-center">
                <Title>Tin tức mới nhất</Title>
                <a className= "text-base text-text-secondary">Xem tất cả</a>
            </div>
            <NewsList />


        </>
    )
}