"use client";

import { useSettings } from "@/queries/useSettingQuery";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { data: settingsData } = useSettings();
    const authBanner = settingsData?.data?.authBanner || "/images/background4.jpg";

    return (
        <>
            <div 
                className="bg-no-repeat bg-cover bg-center min-h-screen flex justify-center items-center"
                style={{
                    backgroundImage: `url(${authBanner})`
                }}
            >
                {children}
            </div>
        </>
    );
}