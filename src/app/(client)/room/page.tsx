"use client";

import Footer from "@/components/client/footer/footer";
import Title from "@/components/common/title";
import { useSettings } from "@/queries/useSettingQuery";
import { useEffect, useState } from "react";

export default function RoomPage() {
    const { data: settingsData } = useSettings();
    const [bannerImage, setBannerImage] = useState("https://i.pinimg.com/1200x/default.jpg");

    // Cập nhật banner khi API load xong
    useEffect(() => {
        if (settingsData?.data?.childrenBanner?.roomPage) {
            setBannerImage(settingsData.data.childrenBanner.roomPage);
        }
    }, [settingsData]);

    return (
        <>
            {/* Banner Section */}
            <div className="relative w-full h-[300px] md:h-[450px]">
                <img
                    src={bannerImage}
                    alt="Room Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 md:p-6 w-full">
                    <div className="text-xs md:text-base text-white mb-1">Phòng nhạc trực tuyến</div>
                    <h3 className="uppercase text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-1 hover:text-green transition line-clamp-2">
                        PHÒNG NGHE NHẠC CHUNG
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6">
                <Title>Trang phòng nhạc</Title>
                <div className="text-text-primary text-base py-10">
                    Sắp có nội dung
                </div>
            </div>

            <Footer />
        </>
    );
}