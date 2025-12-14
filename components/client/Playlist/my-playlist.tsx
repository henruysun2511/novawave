import { CaretRightFilled, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import PlaylistCreateModal from "./playlist-create-modal";

export default function MyPlaylist() {
    const [open, setOpen] = useState(false);
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


                <div className="group flex items-center cursor-pointer my-2 w-full rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">
                    <div className="relative w-[50px] h-[50px]">
                        <img
                            className="w-full h-full object-cover"
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/471820048_1255860505716632_3514919897901771891_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEOrBGZvyemHO6ffK1KnJ4Oh8f8sCddBzeHx_ywJ10HN97TCwDUxIFL68D9oMHE83zeg8MnhWFuaZHve9uN3TlV&_nc_ohc=6SN-dcYq7aUQ7kNvwG2TXGD&_nc_oc=Adld80hOyt7CdypnCTCjjzwoR4bDHQ0PvX1GAZO5F59tYncwNVmrO07rB170c4SxWMXd6xA7m3PnuNNBxhGYrU-0&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=U5Y-ofZ7PKOrO05ti5ZJCw&oh=00_AfkrXchEUGMTF0Z2SX8-GWm91yufCgOyu7jYi8ktyHvdQw&oe=693A339E"
                            alt=""
                        />

                        <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                            <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center shadow-lg">
                                <CaretRightFilled className="text-xs" />
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col justify-center ml-4">
                        <a className="text-base text-text-primary font-bold mb-0.5">
                            Playlist cho phố bẩn
                        </a>
                        <a className="text-sm text-gray-400">3 bài</a>
                    </div>


                </div>
            </div>

            <PlaylistCreateModal open={open} onCancel={() => setOpen(false)}/>

        </>
    )
}