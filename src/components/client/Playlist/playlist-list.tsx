"use client";

import { Playlist } from "@/types/object.type";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PlaylistCard from "./playlist-card";

export default function PlaylistList({ playlists }: { playlists: Playlist[] }) {
    if (!playlists || playlists.length === 0) {
        return null;
    }

    return (
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
                delay: 4000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                480: { slidesPerView: 3, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1280: { slidesPerView: 6, spaceBetween: 20 },
            }}
        >
            {playlists.map((playlist) => (
                <SwiperSlide key={playlist._id}>
                    <PlaylistCard playlist={playlist} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
