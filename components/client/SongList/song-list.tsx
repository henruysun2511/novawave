import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { default as SongCard, default as SongCardUi } from "./song-card-ui";

export default function SongList() {
    return (
        <>
            <div className="flex flex-wrap gap-4">
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
                <SongCardUi />
            </div>

            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                slidesPerGroup={1}   
                navigation
                modules={[Navigation, Autoplay]}
                className="mySwiper"
                pagination={{ clickable: true }}
                speed={600}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
                <SwiperSlide><SongCard /></SwiperSlide>
            </Swiper>
        </>

    );
}