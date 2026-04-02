"use client";
import { Segmented, SegmentedProps } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useState } from "react";
import ArtistAlbum from "./artist-album";
import ArtistAlbumCreate from "./artist-album-create";

export default function ArtistAlbumManagementPage() {
    const [active, setActive] = useState<SegmentedValue>("artist-album");
    const options: SegmentedProps["options"] = [
        { label: "Danh sách album", value: "artist-album" },
        { label: "Tạo album", value: "artist-album-create" },
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
                {active === "artist-album" && <ArtistAlbum />}
                {active === "artist-album-create" && <ArtistAlbumCreate />}
            </div>
        </>
    )
}