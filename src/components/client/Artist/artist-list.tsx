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
                {artists?.map((artist) => (
                    <SwiperSlide key={artist._id}>
                        <ArtistCard artist={artist}/>
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    );
}