import { useUserPlaylists } from "@/queries/usePlaylistQuery";
import { Playlist } from "@/types/object.type";
import { CaretRightFilled, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PlaylistCreateModal from "./playlist-create-modal";

export default function MyPlaylist() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: userPlaylistRes } = useUserPlaylists();
    const userPlaylists = userPlaylistRes?.data ?? [];
    return (
        <>
            <div className="p-3">
                <div className="flex justify-between">
                    <h1 className="text-base text-text-primary font-bold">Danh sách phát của tôi</h1>

                    <Tooltip title="Thêm playlist mới" placement="top">
                        <PlusOutlined
                            className="text-text-primary cursor-pointer text-base"
                            onClick={() => setOpen(true)}
                        />
                    </Tooltip>
                </div>


                {userPlaylists && userPlaylists.length > 0 ? (
                    <>
                        <div className="flex flex-wrap gap-3">
                            {userPlaylists.map((playlist: Playlist) => (
                                <div className="group flex items-center cursor-pointer my-2 w-full rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">
                                    <div className="relative w-[50px] h-[50px]">
                                        <div className="flex items-center justify-center w-full h-full text-3xl font-bold text-white bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-xl">
                                            {playlist?.name?.[0]?.toUpperCase()}
                                        </div>

                                        <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                            <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center shadow-lg">
                                                <CaretRightFilled className="text-xs" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-col justify-center ml-4">
                                        <a className="text-base text-text-primary font-bold mb-0.5"
                                        onClick={() => router.push(`/playlist/${playlist._id}`)}>
                                            {playlist.name || "Đang cập nhật"}
                                        </a>
                                        <a className="text-sm text-gray-400"></a>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </>
                ) : (
                    <div className="text-text-primary text-base">
                        Đăng nhập để tạo playlist
                    </div>
                )}
            </div>

            <PlaylistCreateModal open={open} onCancel={() => setOpen(false)} />

        </>
    )
}