"use client";
import { useSettings } from "@/queries/useSettingQuery";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainBanner() {
    const { data: settingsData } = useSettings();
    const banners = settingsData?.data?.mainBanner || [];

    if (!banners || banners.length === 0) {
        return null;
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
                    <div className="relative w-full h-100 md:h-100 rounded-2xl overflow-hidden shadow-lg">
                        <div className="absolute top-0 left-0 z-0 w-full h-full">
                            <img
                                className="w-full h-full object-cover"
                                src={banner?.imageUrl || "/images/placeholder.jpg"}
                                alt="Novawave Music Background"
                            />
                        </div>

                        <div className="absolute top-0 left-0 z-0 w-full h-full bg-black opacity-40"></div>
                        <div className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-start mx-3.5 md:p-10 text-white">
                            <h1 className="text-3xl md:text-4xl font-opensans uppercase font-bold mb-6 leading-tight">
                                {banner.title || "Khám Phá Bản Giao Hưởng Của Cuộc Sống, Lắng Nghe Mọi Con Sóng Cảm Xúc"}
                            </h1>

                            <h3 className="text-sm text-text-secondary md:text-lg font-medium max-w-3xl opacity-90 mb-6 color-[var(--text-secondary)]">
                                {banner.description || "Novawave là nền tảng phát nhạc trực tuyến được thiết kế để đưa bạn đắm chìm vào một thế giới âm thanh không giới hạn. Với thư viện khổng lồ gồm hàng triệu bài hát từ mọi thể loại, từ Pop, Rock đến Lo-fi và nhạc Cổ điển, Novawave đảm bảo bạn sẽ luôn tìm thấy &quot;con sóng&quot; âm nhạc phù hợp với tâm trạng của mình."}
                            </h3>

                            <div className="flex gap-4 mt-4">
                                <div onClick={() => window.open(banner?.redirectLink || "/", "_blank")} className="base-button">
                                    Khám phá ngay
                                </div>
                                <div className="base-button !bg-gray-500">Nghe nhạc nào</div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
