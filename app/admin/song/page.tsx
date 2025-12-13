"use client";
import Title from "@/components/ui/title";
import { useGenreList } from "@/queries/useGenreQuery";
import { useSongListByAdmin } from "@/queries/useSongQuery";
import { Input, Select, Space } from "antd";
import { useMemo, useState } from "react";
import SongTable from "./song-table";
const { Search } = Input;



export default function SongManagementPage() {
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        name: "",
        genreNames: [] as string[], 
    });


    const { data, isLoading } = useSongListByAdmin(params);
    const { data: genreData, isLoading: isGenreLoading } = useGenreList(); 
    
    const genreOptions = useMemo(() => {
        return genreData?.data?.map((genre: any) => ({
            value: genre.name, 
            label: genre.name,
        })) || [];
    }, [genreData]);
    
    const handleGenreChange = (values: string[]) => {
        setParams((prev) => ({ 
            ...prev, 
            genreNames: values, 
            page: 1 
        }));
    }

    return (
        <>
            <Title>Quản lý Bài hát (Admin)</Title>
            <div className="mb-8"></div>
            <Space direction="vertical" className="w-full" size="large">
                <div className="flex justify-between">
                    <Space direction="horizontal" size="large">
                        {/* Filter theo Name */}
                        <Search 
                            size='large' 
                            placeholder="Tìm kiếm theo tên bài hát" 
                            allowClear 
                            style={{ width: 550 }}
                            onSearch={(value) =>
                                setParams((prev) => ({ ...prev, name: value, page: 1 }))
                            } 
                        />
                        
                        {/* Filter theo Genre (Sử dụng mode="multiple" cho phép chọn nhiều) */}
                        <Select
                            size="large" 
                            mode="multiple" 
                            style={{ width: 250 }} 
                            placeholder="Lọc theo thể loại" 
                            options={genreOptions}
                            onChange={handleGenreChange} 
                        />
                    </Space>
                    {/* Không cần nút Thêm bài hát ở trang Admin */}
                </div>

                <SongTable
                    data={data?.data ?? []}
                    loading={isLoading}
                    pagination={{
                        current: data?.meta?.page,
                        pageSize: data?.meta?.size,
                        total: data?.meta?.totalElements,
                        onChange: (page: number) =>
                            setParams((prev) => ({ ...prev, page })),
                    }}
                />
            </Space>

        </>
    )
}