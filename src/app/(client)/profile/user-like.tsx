import SongCard from "@/components/client/Song/song-card";
import { EmptyState } from "@/components/common/empty";
import SquareSkeleton from "@/components/common/skeleton/square-skeleton";
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
                    <EmptyState title="Chưa có bài hát nào" />
                )}
            </div>
        </>
    )
}