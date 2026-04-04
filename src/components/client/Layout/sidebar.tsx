"use client"
import { Segmented, SegmentedProps } from "antd";
import { useState } from "react";
import MyPlaylist from "../Playlist/my-playlist";
import MenuBar from "./menu-bar";

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
            className="h-full p-2 rounded-2xl flex flex-col border border-white/5 shadow-lg"
        >
            <div className="flex-1 overflow-y-auto scrollbar-hidden">
                {active === "menu" && <MenuBar />}
                {active === "myPlaylist" && <MyPlaylist />}
            </div>

            <div className="mt-4 pt-2 border-t border-white/5">
                <Segmented
                    options={options}
                    value={active}
                    onChange={(v) => setActive(v)}
                    block
                    className="custom-segmented-ui" // Thêm class để custom CSS
                />
            </div>
        </div>
    );
}