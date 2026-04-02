"use client";

import NewsList from "@/components/client/NewsList/news-list";
import SquareSkeleton from "@/components/common/skeleton";
import Title from "@/components/common/title";
import { useNewsList } from "@/queries/useNewsQuery";
import { useSettings } from "@/queries/useSettingQuery";
import { NewsStatus } from "@/types/constant.type";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

export default function NewsPage() {
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        status: NewsStatus.PUBLISHED, 
    });
    const [bannerImage, setBannerImage] = useState("https://i.pinimg.com/1200x/80/73/eb/8073eb44c4d2f41837bbeaedc976d4b6.jpg");

    const { data: newsData, isPending } = useNewsList(params);
    const { data: settingsData } = useSettings();
    
    // Cập nhật banner khi API load xong
    useEffect(() => {
        if (settingsData?.data?.childrenBanner?.newsPage) {
            setBannerImage(settingsData.data.childrenBanner.newsPage);
        }
    }, [settingsData]);

    const news = newsData?.data || [];
    const meta = newsData?.meta;

    return (
        <>
            {/* Banner Section */}
            <div className="relative w-full h-[300px] md:h-[450px]">
                <img
                    src={bannerImage}
                    alt="Music News Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 md:p-6 w-full">
                    <div className="text-xs md:text-base text-white mb-1">
                        Tin tức âm nhạc mới nhất trong ngày
                    </div>
                    <h3 className="uppercase text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-1 hover:text-green transition line-clamp-2">
                        MUSIC NEWS
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6">
                <Title>Tin tức mới nhất</Title>
                
                {isPending ? (
                    <SquareSkeleton />
                ) : news && news.length > 0 ? (
                    <>
                        {/* Render danh sách qua component NewsList đã sửa ở bước trước */}
                        <NewsList newsList={news} />

                        {/* Pagination */}
                        <div className="mt-10 flex justify-center">
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
                    <div className="text-text-primary text-base py-10">
                        Chưa có tin tức nào được cập nhật
                    </div>
                )}
            </div>
        </>
    );
}