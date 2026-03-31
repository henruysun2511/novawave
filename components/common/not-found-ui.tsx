"use client";

import { FrownOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

interface NotFoundProps {
    message?: string;
    description?: string;
    backUrl?: string;
    backText?: string;
}

const NotFoundUI: React.FC<NotFoundProps> = ({
    message = "Không tìm thấy nội dung",
    description = "Yêu cầu của bạn có thể đã bị xóa hoặc đường dẫn không đúng.",
    backUrl = "/",
    backText = "Quay lại Trang chủ",
}) => {
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-8 rounded-3xl mt-5 shadow-2xl border border-white/5 animate-fade-in">
            {/* Icon / Visual Container */}
            <div className="relative mb-8">
                <div className="absolute inset-0 animate-ping rounded-full bg-red-500/10 blur-2xl"></div>
                <FrownOutlined className="text-8xl text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            </div>

            {/* Content Text */}
            <div className="text-center max-w-md mx-auto">
                <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight uppercase leading-tight">
                    {message}
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] opacity-80 mb-10 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Back Button */}
            <Link
                href={backUrl}
                className="group relative flex items-center gap-3 px-8 py-3 bg-[var(--color-green)] text-white font-bold rounded-full shadow-[0_8px_20px_rgba(37,162,106,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_25px_rgba(37,162,106,0.5)] active:scale-95"
            >
                <HomeOutlined className="text-xl group-hover:animate-bounce" />
                <span className="uppercase tracking-wider">{backText}</span>
            </Link>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default NotFoundUI;
