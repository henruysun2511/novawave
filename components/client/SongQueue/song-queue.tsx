"use client"
import { useSidebarStore } from "@/stores/useSidebarStore";
import { DownSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import NewSongCard from "../NewSongList/newsong-card";

export default function SongQueue() {
    const hidePanel = useSidebarStore((s) => s.hideRightPanel);
    return (
        <>
            <div className="bg-[var(--background-secondary)] rounded-2xl overflow-scroll scrollbar-hidden w-full h-full p-5">
                <div className="flex gap-3 items-center mb-8">
                    <Tooltip title="Đóng hàng đợi" placement="top">
                        <DownSquareOutlined
                            className="text-text-primary font-bold cursor-pointer"
                            onClick={hidePanel}
                        />
                    </Tooltip>
                    <h1 className="text-xl text-text-primary font-bold">Danh sách đợi</h1>
                </div>
                <h3 className="text-base my-3 text-text-primary font-bold">Đang phát</h3>
                <NewSongCard />
                <h3 className="text-base my-3 text-text-primary font-bold">Tiếp theo</h3>
                <NewSongCard />
                <NewSongCard />
                <NewSongCard />
                <NewSongCard />
                <NewSongCard />
                <NewSongCard />
            </div>

        </>
    )
}