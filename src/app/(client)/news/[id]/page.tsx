"use client";

import NewsList from "@/components/client/News/news-list";
import Footer from "@/components/client/Layout/footer";
import Loading from "@/components/common/loading";
import NotFoundUI from "@/components/common/not-found-ui";
import Title from "@/components/common/title";
import { useNewsDetail, useNewsList } from "@/queries/useNewsQuery";
import { NewsStatus } from "@/types/constant.type";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Space } from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

export default function NewsDetailPage() {
    const { id } = useParams<{ id: string }>();

    // 1. Lấy chi tiết tin tức hiện tại
    const { data: newsRes, isLoading } = useNewsDetail(id);
    const news = newsRes?.data;

    // 2. Lấy danh sách tin tức khác để gợi ý (lấy khoảng 6 tin mới nhất)
    const { data: otherNewsRes } = useNewsList({ 
        page: 1, 
        size: 7, 
        status: NewsStatus.PUBLISHED
    });

    // 3. Lọc bỏ tin đang xem
    const otherNews = otherNewsRes?.data?.filter((item: any) => item._id !== id).slice(0, 6) || [];

    if (isLoading) return <Loading />;
    if (!news) return <NotFoundUI />;

    return (
        <>
            <div className="max-w-[1200px] mx-auto p-6">
                {/* Banner Section */}
                <div className="relative w-full h-[500px] mb-8">
                    <img
                        src={news.imageUrl || "https://placehold.co/1200x600?text=No+Image"}
                        alt={news.title}
                        className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl"></div>

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                            {news.title}
                        </h1>

                        <Space size="large" className="text-gray-300">
                            <Space>
                                <Avatar
                                    size="small"
                                    src={news.createdBy?.avatar}
                                    icon={<UserOutlined />}
                                    className="bg-green"
                                />
                                <span className="text-base font-medium">
                                    {news.createdBy?.username || "Admin"}
                                </span>
                            </Space>
                            <Space>
                                <ClockCircleOutlined />
                                <span className="text-base">
                                    {dayjs(news.createdAt).format('DD [Tháng] MM, YYYY')}
                                </span>
                            </Space>
                        </Space>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex justify-center">
                    <div className="w-full px-5">
                        <div
                            className="news-detail-content text-text-secondary text-lg leading-relaxed antialiased"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />

                        <Divider className="border-gray-800 my-10" />

                        {/* Tags bài viết */}
                        <div className="flex items-center gap-2 mb-10">
                            <span className="text-gray-500">Chủ đề:</span>
                            <span className="text-green cursor-pointer hover:underline">#MusicNews</span>
                            <span className="text-green cursor-pointer hover:underline">#NovaWave</span>
                        </div>
                    </div>
                </div>

                {/* Section: Tin tức khác */}
                {otherNews.length > 0 && (
                    <div className="px-5">
                        <div className="flex justify-between items-end mb-8">
                            <Title>Tin tức khác</Title>
                        </div>
                        <NewsList newsList={otherNews} />
                    </div>
                )}
            </div>

            <Footer />

            <style jsx global>{`
                .news-detail-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 12px;
                    margin: 20px 0;
                }
                .news-detail-content p {
                    margin-bottom: 1.5rem;
                }
                .news-detail-content h2, .news-detail-content h3 {
                    color: white;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 700;
                }
                .news-detail-content a {
                    color: #25A26A;
                }
                .news-detail-content blockquote {
                    border-left: 4px solid #25A26A;
                    padding-left: 20px;
                    font-style: italic;
                    margin: 20px 0;
                    background: #1F1F1F;
                    padding: 15px 20px;
                    border-radius: 0 8px 8px 0;
                }
            `}</style>
        </>
    );
}