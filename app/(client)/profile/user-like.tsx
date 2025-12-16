import SongCard from "@/components/client/SongList/song-card";
import SquareSkeleton from "@/components/ui/skeleton";
import { useUserLike } from "@/queries/useLikeQuery";
import { Pagination } from "antd";
import { useState } from "react";

export default function UserLike() {
    const [params, setParams] = useState({
        page: 1,
        size: 10
    });

    const { data: songData, isPending: isSongPending } = useUserLike(params)
    const songs = songData?.data || [];
    console.log(songs)
    const meta = songData?.meta;
    return (
        <>
            <div className="p-6">
                {isSongPending ? (
                    <SquareSkeleton />
                ) : songs && songs.length > 0 ? (
                    <>
                        <div className="flex flex-wrap gap-3">
                            {songs.map((p: any) => (
                                <SongCard key={p._id} song={p.songId} />
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
                        Chưa có nghệ sĩ nào
                    </div>
                )}
            </div>
        </>
    )
}