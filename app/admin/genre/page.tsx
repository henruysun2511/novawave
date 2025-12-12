"use client";
import { useGenreList } from "@/queries/useGenreQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import GenreCreateModal from "./genre-create-modal";
import GenreTable from "./genre-table";


export default function GenreManagementPage() {
    const [openCreate, setOpenCreate] = useState(false);
    const { data, isLoading } = useGenreList();
    console.log(data)

    return (
        <>
            <Space direction="vertical" className="w-full" size="large">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Quản lý thể loại</h2>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className="bg-green"
                        onClick={() => setOpenCreate(true)}
                    >
                        Thêm thể loại
                    </Button>
                </div>

                <GenreTable data={data?.data ?? []} loading={isLoading} />
            </Space>

            <GenreCreateModal open={openCreate} onCancel={() => setOpenCreate(false)} />
        </>
    );
}