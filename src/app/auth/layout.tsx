"use client";

import { useSettings } from "@/queries/useSettingQuery";
import { useEffect, useState } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { data: settingsData, isLoading } = useSettings();
    const [backgroundImage, setBackgroundImage] = useState("/images/background4.jpg");

    // Cập nhật background khi API load xong
    useEffect(() => {
        if (settingsData?.data?.authBanner) {
            setBackgroundImage(settingsData.data.authBanner);
        }
    }, [settingsData]);

    return (
        <>
            <div 
                className="bg-no-repeat bg-cover bg-center min-h-screen flex justify-center items-center fixed inset-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
                {/* Overlay để chỉnh sáng nếu cần */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Content */}
                <div className="relative z-10 w-full h-full flex justify-center items-center">
                    {children}
                </div>
            </div>
        </>
    );
}