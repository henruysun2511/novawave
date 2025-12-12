"use client";
import { Segmented, SegmentedProps } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useState } from "react";
import ArtistSong from "./artist-song";
import ArtistUploadSong from "./artist-upload-song";

export default function ArtistSongManagementPage() {
    const [active, setActive] = useState<SegmentedValue>("artits-song");
    const options: SegmentedProps["options"] = [
        { label: "Danh sách bài hát", value: "artits-song" },
        { label: "Upload track nhạc", value: "artist-upload-song" },
    ];

    return (
        <>
            <Segmented
                options={options}
                value={active}
                onChange={(v) => setActive(v)}
                block
            />
            <div className="flex-1 overflow-hidden mt-4">
                {active === "artits-song" && <ArtistSong />}
                {active === "artist-upload-song" && <ArtistUploadSong />}
            </div>
        </>
    )
}