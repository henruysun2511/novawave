"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AdvertisementBanner from "./advertisement-banner";

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
            
        </>
    )
}