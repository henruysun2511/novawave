"use client";
import { useSettings } from '@/queries/useSettingQuery';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const { data: settingsData } = useSettings();
    const [logoUrl, setLogoUrl] = useState("/images/logo.png");

    // Cập nhật logo khi API load xong
    useEffect(() => {
        if (settingsData?.data?.logo) {
            setLogoUrl(settingsData.data.logo);
        }
    }, [settingsData]);

    return (
        <>
            <div className="flex items-center justify-between py-6 bg-[#1a1a1a] px-6">
                <Link href="/admin/overview">
                    <img
                        src={logoUrl}
                        alt="Logo"
                        width={140}
                        height={140}
                        className='cursor-pointer hover:opacity-80 transition'
                    />
                </Link>
                <div className='flex items-center gap-4 pr-4'>
                    {/* Header actions can be added here */}
                </div>
            </div>
        </>
    )
}