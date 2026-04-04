"use client";
import ArtistCard from "@/components/client/Artist/artist-card";
import { EmptyState } from "@/components/common/empty";
import CircleSkeleton from "@/components/common/skeleton/circle-skeleton";
import Title from "@/components/common/title";
import { useArtistList } from "@/queries/useArtistQuery";
import { useSettings } from "@/queries/useSettingQuery";
import { Artist } from "@/types/object.type";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

export default function ArtistPage() {
    const [params, setParams] = useState({
        page: 1,
        size: 10
    });
    const [bannerImage, setBannerImage] = useState("/images/jungkook.jpg");

    const { data: artistData, isPending: isArtistPending } = useArtistList(params)
    const { data: settingsData } = useSettings();

    // Cập nhật banner khi API load xong
    useEffect(() => {
        if (settingsData?.data?.childrenBanner?.artistPage) {
            setBannerImage(settingsData.data.childrenBanner.artistPage);
        }
    }, [settingsData]);

    const artists = artistData?.data || [];
    const meta = artistData?.meta;

    return (
        <>
            <div className="relative w-full h-[300px] md:h-[450px]">
                <img
                    src={bannerImage}
                    alt="Artist Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 md:p-6 w-full">
                    <div className="text-xs md:text-base text-white">
                        Khám phá tài năng âm nhạc
                    </div>
                    <h3 className="uppercase text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-1 hover:text-green transition line-clamp-2">
                        Nghệ sĩ
                    </h3>
                </div>
            </div>

            <div className="p-4 md:p-6">
                <Title>Danh sách nghệ sĩ</Title>
                {isArtistPending ? (
                    <CircleSkeleton />
                ) : artists && artists.length > 0 ? (
                    <>
                        <div className="flex flex-wrap gap-3">
                            {artists.map((p: Artist) => (
                                <ArtistCard key={p._id} artist={p} />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination
                                current={meta?.page ?? 1}
                                pageSize={meta?.size ?? 10}
                                total={20}
                                onChange={(page, size) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        page,
                                        size,
                                    }))
                                }
                            />
                        </div>
                    </>
                ) : (
                    <EmptyState title="Chưa có nghệ sĩ nào" />
                )}
            </div>


        </>
    );
}