"use client";

import { useArtistProfile } from "@/queries/useArtistQuery";
import { SegmentedProps } from "antd";
import Segmented, { SegmentedValue } from "antd/es/segmented";
import { useState } from "react";
import ArtistProfileInfo from "./artist-profile-info";
import ArtistProfileUpdate from "./artist-profile-update";


export default function ArtistProfileManagementPage() {
    const [active, setActive] = useState<SegmentedValue>("artits-profile-info");
    const options: SegmentedProps["options"] = [
        { label: "Thông tin chung", value: "artits-profile-info" },
        { label: "Cập nhật thông tin", value: "artits-profile-update" },
    ];

    const { data: artistUserData } = useArtistProfile();
    console.log(artistUserData)
    const artist = artistUserData?.data;
    if (!artist) return null;
    
    return (
        <>
            <Segmented
                options={options}
                value={active}
                onChange={(v) => setActive(v)}
                block
            />
            <div className="flex-1 overflow-hidden mt-4">
                {active === "artits-profile-info" && <ArtistProfileInfo artist={artist } />}
                {active === "artits-profile-update" && <ArtistProfileUpdate artist={artist}/>}
            </div>
        </>
    )
}