"use client";
import PlaylistCreateModal from "@/components/client/Playlist/playlist-create-modal";
import Title from "@/components/ui/title";
import { useAdminPlaylistList } from "@/queries/usePlaylistQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import PlaylistCollapse from "./playlist-collapse";


export default function PlaylistManagementPage() {
    const [openCreate, setOpenCreate] = useState(false);
    const { data, isLoading } = useAdminPlaylistList();

    return (
        <>
            <Space direction="vertical" className="w-full" size="large">
                <Title>Quản lý playlist</Title>
                <div className="flex justify-between items-center">

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className="bg-green"
                        onClick={() => setOpenCreate(true)}
                    >
                        Thêm playlist
                    </Button>
                </div>
                <PlaylistCollapse playlists={data?.data || []} />

            </Space>

            <PlaylistCreateModal open={openCreate} onCancel={() => setOpenCreate(false)}/>
        </>
    );
}