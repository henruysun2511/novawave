"use client"
import { Segmented, SegmentedProps } from "antd";
import { useState } from "react";
import MenuBar from "../MenuBar/menu-bar";
import MyPlaylist from "../Playlist/my-playlist";
import "./sidebar.css";

type SegmentedValue = string | number;

export default function SideBar() {
    const [active, setActive] = useState<SegmentedValue>("menu");
    const options: SegmentedProps["options"] = [
        { label: "Menu", value: "menu" },
        { label: "Playlist của tôi", value: "myPlaylist" },
    ];

    return (
        <div
            style={{ width: "100%", background: "var(--background-secondary)" }}
            className="h-screen pt-3 px-0.5 rounded-2xl flex flex-col"
        >
            {/* Content */}
            <div className="flex-1 overflow-hidden mt-4">
                {active === "menu" && <MenuBar />}
                {active === "myPlaylist" && <MyPlaylist />}
            </div>

            {/* Segmented ở đáy */}
            <div className="mt-auto pb-3">
                <Segmented
                    options={options}
                    value={active}
                    onChange={(v) => setActive(v)}
                    block
                />
            </div>
        </div>
    );
}