import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SongCard from "./song-card";

export default function SongList() {
    return (
        <>
            <div className="flex flex-wrap gap-4">
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
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