"use client";

import Footer from "@/components/client/footer/footer";
import Title from "@/components/common/title";
import { useSettings } from "@/queries/useSettingQuery";

export default function RoomPage() {
    const { data: settingsData } = useSettings();
    const bannerImage = settingsData?.data?.childrenBanner?.roomPage || "https://i.pinimg.com/1200x/default.jpg";

    return (
        <>
            {/* Banner Section */}
            <div className="relative w-full h-[450px]">
                <img
                    src={bannerImage}
                    alt="Room Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">Phòng nhạc trực tuyến</div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        PHÒNG
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <Title>Trang phòng nhạc</Title>
                <div className="text-text-primary text-base py-10">
                    Sắp có nội dung
                </div>
            </div>

            <Footer />
        </>
    );
}