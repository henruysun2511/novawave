import { Artist } from "@/types/object.type";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArtistCard from "./artist-card";

export default function ArtistList({ artists }: { artists: Artist[] }) {
    if (!artists || artists.length === 0) {
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
                {artists?.map((artist) => (
                    <SwiperSlide key={artist._id}>
                        <ArtistCard artist={artist}/>
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    );
}