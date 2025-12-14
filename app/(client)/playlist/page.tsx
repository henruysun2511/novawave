"use client";
import Footer from "@/components/client/footer/footer";
import PlaylistCard from "@/components/client/Playlist/playlist-card";
import SquareSkeleton from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { usePlaylistList } from "@/queries/usePlaylistQuery";
import { Playlist } from "@/types/object.type";
import { Pagination } from "antd";
import { useState } from "react";

export default function PlaylistPage() {
    const [params, setParams] = useState({
        page: 1,
    });
    const { data: playlistData, isPending } = usePlaylistList(params)
    const playlists = playlistData?.data || [];

    const meta = playlistData?.meta;
    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="https://i.pinimg.com/1200x/84/5b/c7/845bc74d9403f7bf2a77ead71d01a9a7.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Dành cho bạn
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        PLAYLIST THỊNH HÀNH
                    </h3>
                </div>
            </div>

            <div className="p-6">
                <Title>Danh sách playlist</Title>

                {isPending ? (
                    <SquareSkeleton />
                ) : playlists && playlists.length > 0 ? (
                    <>
                        <div className="flex flex-wrap gap-5">
                            {playlists.map((playlist: Playlist) => (
                                <PlaylistCard key={playlist._id} playlist={playlist} />
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
                        Chưa có playlist nào
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}