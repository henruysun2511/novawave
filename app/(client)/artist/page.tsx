"use client";
import ArtistCard from "@/components/client/ArtistList/artist-card";
import SquareSkeleton from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { useArtistList } from "@/queries/useArtistQuery";
import { Artist } from "@/types/object.type";
import { Pagination } from "antd";
import { useState } from "react";

export default function ArtistPage() {
    const [params, setParams] = useState({
        page: 1,
        size: 10
    });


    const { data: artistData, isPending: isArtistPending } = useArtistList(params)
    const artists = artistData?.data || [];
    const meta = artistData?.meta;

    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="/images/jungkook.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mt-5">
                        Khám phá tài năng âm nhạc
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Nghệ sĩ
                    </h3>
                </div>
            </div>

            <div className="p-6">
                <Title>Danh sách nghệ sĩ</Title>
                {isArtistPending ? (
                    <SquareSkeleton />
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
                    <div className="text-text-primary text-base">
                        Chưa có nghệ sĩ nào
                    </div>
                )}
            </div>


        </>
    );
}