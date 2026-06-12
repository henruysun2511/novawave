import { Song } from "@/types/object.type";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SongCard from "./song-card";

export default function SongList({songs} : {songs : Song[]}) {
    if (!songs || songs.length === 0) {
        return null; 
    }
    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={12}
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
                breakpoints={{
                    480: { slidesPerView: 3, spaceBetween: 16 },
                    768: { slidesPerView: 4, spaceBetween: 16 },
                    1024: { slidesPerView: 5, spaceBetween: 20 },
                    1280: { slidesPerView: 6, spaceBetween: 20 },
                }}
            >
                {songs?.map((song) => (
                    <SwiperSlide key={song._id}>
                        <SongCard song={song} /> 
                    </SwiperSlide>
                ))}
            </Swiper>
        </>

    );
}