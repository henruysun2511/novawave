"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { Select } from "antd";
import ArtistDashboard from "./artist-dashboard";
import RevenueDashboard from "./revenue-dashboard";
import TopArtistDashboard from "./top-artist-dashboard";
import TopSongDashboard from "./top-song-dashboard";
import UserDashboard from "./user-dashboard";

const { Option } = Select;

export default function OverviewManaPage() {
    const user = useAuthStore((state) => state.user);


    return (
        <div className="flex flex-col gap-10">

            {/* ===== Header ===== */}
            <div className="flex flex-col gap-2">
                <div className="text-5xl font-extrabold text-text-primary">
                    👋 Chào mừng trở lại, {user?.username}
                </div>

            </div>

            <UserDashboard />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <TopSongDashboard />
                <TopArtistDashboard />
            </div>

            <div className="bg-[var(--background-secondary)] p-8 rounded-2xl">
                <ArtistDashboard />
            </div>

            <div className="bg-[var(--background-secondary)] p-8 rounded-2xl">
                <RevenueDashboard />
            </div>


        </div>
    );
}
