import ArtistCard from "@/components/client/ArtistList/artist-card";
import SquareSkeleton from "@/components/ui/skeleton";
import { useUserFollow } from "@/queries/useFollowQuery";
import { Artist } from "@/types/object.type";
import { Pagination } from "antd";
import { useState } from "react";

export default function UserFollow() {
    const [params, setParams] = useState({
        page: 1,
        size: 10
    });


    const { data: artistData, isPending: isArtistPending } = useUserFollow(params)
    const artists = artistData?.data || [];
    console.log(artists)
    const meta = artistData?.meta;
    return (
        <>
            <div className="p-6">
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