"use client";
import { useSettings } from "@/queries/useSettingQuery";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainBanner() {
    const { data: settingsData, isLoading } = useSettings();
    const [banners, setBanners] = useState<any[]>([]);

    // Cập nhật banners khi API load xong
    useEffect(() => {
        if (settingsData?.data?.mainBanner) {
            setBanners(settingsData.data.mainBanner);
        }
    }, [settingsData]);

    // Hiển thị skeleton khi loading
    if (isLoading || banners.length === 0) {
        return (
            <div className="relative w-full h-52 sm:h-72 md:h-96 lg:h-100 rounded-2xl overflow-hidden shadow-lg">
                <Skeleton
                    active
                    paragraph={{ rows: 4 }}
                    style={{ height: "100%" }}
                    className="bg-zinc-900/50"
                />
            </div>
        );
    }

    return (
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
            {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-52 sm:h-72 md:h-96 lg:h-100 rounded-2xl overflow-hidden shadow-lg">
                        <div className="absolute top-0 left-0 z-0 w-full h-full">
                            <img
                                className="w-full h-full object-cover"
                                src={banner?.imageUrl || "/images/placeholder.jpg"}
                                alt="Novawave Music Background"
                            />
                        </div>

                        <div className="absolute top-0 left-0 z-0 w-full h-full bg-black opacity-40"></div>
                        <div className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-end sm:justify-start p-4 sm:p-6 md:p-10 text-white">
                            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-opensans uppercase font-bold mb-2 sm:mb-4 md:mb-6 leading-tight line-clamp-2 sm:line-clamp-3">
                                {banner.title || "Khám Phá Bản Giao Hưởng Của Cuộc Sống, Lắng Nghe Mọi Con Sóng Cảm Xúc"}
                            </h1>

                            <h3 className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-3xl opacity-90 mb-3 md:mb-6 text-text-secondary line-clamp-2 md:line-clamp-3">
                                {banner.description || "Novawave là nền tảng phát nhạc trực tuyến được thiết kế để đưa bạn đắm chìm vào một thế giới âm thanh không giới hạn."}
                            </h3>

                            <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4">
                                <div onClick={() => window.open(banner?.redirectLink || "/", "_blank")} className="base-button text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2">
                                    Khám phá ngay
                                </div>
                                <div className="base-button !bg-gray-500 text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2">Nghe nhạc nào</div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
