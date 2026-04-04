"use client";
import AlbumCard from "@/components/client/Album/album-card";
import Footer from "@/components/client/Layout/footer";
import { EmptyState } from "@/components/common/empty";
import SquareSkeleton from "@/components/common/Skeleton/square-skeleton";
import Title from "@/components/common/title";
import { useAlbumList } from "@/queries/useAlbumQuery";
import { useSettings } from "@/queries/useSettingQuery";
import { Album } from "@/types/object.type";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

export default function GenrePage() {
    const [params, setParams] = useState({
        page: 1,
    });
    const [bannerImage, setBannerImage] = useState("https://i.pinimg.com/1200x/2f/97/f1/2f97f1f6ac89947f8ea1ac9e85b19623.jpg");
    const { data: albumData, isPending: isAlbumPending } = useAlbumList(params)
    const { data: settingsData } = useSettings();

    // Cập nhật banner khi API load xong
    useEffect(() => {
        if (settingsData?.data?.childrenBanner?.albumPage) {
            setBannerImage(settingsData.data.childrenBanner.albumPage);
        }
    }, [settingsData]);

    const albums = albumData?.data || [];
    const meta = albumData?.meta;

    return (
        <>
            <div className="relative w-full h-[300px] md:h-[450px]">
                <img
                    src={bannerImage}
                    alt="Album Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 md:p-6 w-full">
                    <div className="text-xs md:text-base text-white mb-1">
                        Khám phá album mới nhất
                    </div>
                    <h3 className="uppercase text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-1 hover:text-green transition line-clamp-2">
                        Album
                    </h3>
                </div>
            </div>

            <div className="p-4 md:p-6">
                <Title>Danh sách album</Title>

                {isAlbumPending ? (
                    <SquareSkeleton />
                ) : albums && albums.length > 0 ? (
                    <>
                        <div className="flex flex-wrap gap-3">
                            {albums.map((album: Album) => (
                                <AlbumCard key={album._id} album={album} />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination
                                current={meta?.page ?? 1}
                                pageSize={meta?.size ?? 10}
                                total={meta?.totalElements ?? 0}
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
                    <EmptyState title="Không có album nào" />
                )}
            </div>

            <Footer />
        </>
    );
}