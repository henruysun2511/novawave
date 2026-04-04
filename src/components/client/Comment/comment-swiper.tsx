"use client";

import { EmptyState } from "@/components/common/empty";
import { useLatestComments } from "@/queries/useCommentQuery";
import { MessageOutlined } from "@ant-design/icons";
import { Avatar, Skeleton } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

dayjs.extend(relativeTime);

export default function CommentSwiper() {
    const { data: commentsRes, isLoading } = useLatestComments({ page: 1, size: 10 });
    const comments = commentsRes?.data || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-zinc-900/50 p-5 rounded-xl h-[180px]">
                        <Skeleton active avatar paragraph={{ rows: 2 }} />
                    </div>
                ))}
            </div>
        );
    }

    if (!comments || comments.length === 0) return <EmptyState title="Chưa có bình luận nào" />;

    return (
        <div className="relative group/swiper">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1280: { slidesPerView: 3 },
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={800}
                className="pb-10"
            >
                {comments.map((comment: any, index: number) => (
                    <SwiperSlide key={comment._id || index}>
                        <div className="relative overflow-hidden rounded-2xl h-[200px] flex flex-col justify-between p-6 transition-all border border-white/5 hover:border-green/30 group">
                            
                            {/* 1. Background Image với Blur hiệu ứng giống ảnh mẫu */}
                            <div 
                                className="absolute inset-0 z-0 opacity-20 group-hover:scale-110 transition-transform duration-700"
                                style={{
                                    backgroundImage: `url(${comment.songId?.imageUrl || "/images/placeholder.jpg"})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'blur(20px)'
                                }}
                            />
                            
                            {/* Overlay Gradient cho text rõ ràng hơn */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/90 to-black/90" />

                            <div className="relative z-20 flex flex-col h-full">
                                {/* TOP: Avatar và Content */}
                                <div className="flex gap-4 items-start flex-1">
                                    <div className="relative flex-shrink-0">
                                        <Avatar
                                            size={54}
                                            src={comment.userId?.avatar}
                                            className="border-2 border-green shadow-lg"
                                        >
                                            {comment.userId?.username?.charAt(0).toUpperCase()}
                                        </Avatar>
                                        {/* Icon nhạc nhỏ góc avatar */}
                                        <div className="absolute -bottom-1 -right-1 bg-green rounded-full w-5 h-5 flex items-center justify-center border border-black">
                                            <MessageOutlined className="text-[10px] text-black" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-bold text-lg truncate">
                                            {comment.userId?.username || "Ẩn danh"}
                                        </h4>
                                        <p className="text-zinc-100 text-sm line-clamp-3 leading-relaxed mt-1 italic">
                                            "{comment.content}"
                                        </p>
                                    </div>

                                    {/* Ảnh bài hát nhỏ ở góc phải (như ảnh mẫu) */}
                                    {comment.songId && (
                                        <Link href={`/song/${comment.songId._id}`} className="flex-shrink-0">
                                            <img 
                                                src={comment.songId.imageUrl} 
                                                className="w-16 h-16 rounded-lg object-cover shadow-2xl rotate-3 group-hover:rotate-0 transition-transform"
                                                alt="song cover"
                                            />
                                        </Link>
                                    )}
                                </div>

                                {/* BOTTOM: Actions & Time (Giống layout ảnh mẫu với các icon bên dưới) */}
                                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                                    {/* <div className="flex gap-4 text-zinc-400 text-xs">
                                        <span className="flex items-center gap-1 hover:text-green cursor-pointer">
                                            <LikeOutlined /> {Math.floor(Math.random() * 20)}
                                        </span>
                                        <span className="flex items-center gap-1 hover:text-green cursor-pointer">
                                            <MessageOutlined /> 0
                                        </span>
                                        <span className="flex items-center gap-1 hover:text-green cursor-pointer">
                                            <ShareAltOutlined />
                                        </span>
                                    </div> */}
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                                        {dayjs(comment.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}