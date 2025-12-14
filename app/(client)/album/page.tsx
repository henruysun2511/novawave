"use client";
import AlbumCard from "@/components/client/AlbumList/album-card";
import Footer from "@/components/client/footer/footer";
import SquareSkeleton from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { useAlbumList } from "@/queries/useAlbumQuery";
import { Album } from "@/types/object.type";
import { Pagination } from "antd";
import { useState } from "react";

export default function GenrePage() {
    const [params, setParams] = useState({
        page: 1,
    });
    const { data: albumData, isPending: isAlbumPending } = useAlbumList(params)
    const albums = albumData?.data || [];

    const meta = albumData?.meta;

    return (
        <>
            <div className="relative w-full h-[450px] mb-10">
                <img
                    src="https://i.pinimg.com/1200x/2f/97/f1/2f97f1f6ac89947f8ea1ac9e85b19623.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Khám phá album mới nhất
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Album
                    </h3>
                </div>
            </div>

            <div className="p-6">
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
                    <div className="text-text-primary text-base">
                        Chưa có album nào
                    </div>
                )}

            </div>

            <Footer />
        </>
    );
}