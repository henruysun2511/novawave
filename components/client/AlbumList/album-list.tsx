import { Album } from "@/types/object.type";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumCard from "./album-card";

export default function AlbumList({albums} : {albums : Album[]}) {
    if (!albums || albums.length === 0) {
        return null; 
    }
    return (
        <>
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
                {albums?.map((album) => (
                    <SwiperSlide key={album._id}>
                        <AlbumCard album={album} /> 
                    </SwiperSlide>
                ))}
            </Swiper>
        </>

    );
}