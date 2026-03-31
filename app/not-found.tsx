"use client";
import { Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#25A26A] via-[#268d7c] to-[#25A26A] leading-none">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Oops! Trang không tồn tại
        </h2>

        {/* Description */}
        <p className="text-lg text-[#CCCCCC] mb-8 leading-relaxed">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Hãy quay lại trang chủ và tiếp tục khám phá.
        </p>

        {/* Decorative Elements */}
        <div className="mb-12 flex justify-center gap-4">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#25A26A] to-transparent"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="large"
              className="!bg-[#25A26A] !text-black !border-0 !font-semibold hover:!bg-green-600 transition-all duration-300 rounded-lg px-8"
            >
              Quay lại Trang Chủ
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="large"
              className="!bg-transparent !text-[#25A26A] !border-2 !border-[#25A26A] !font-semibold hover:!bg-[#25A26A] hover:!text-black transition-all duration-300 rounded-lg px-8"
            >
              Khám Phá
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 pt-8 border-t border-[#303030]">
          <p className="text-sm text-[#999999] mb-4">
            Cần giúp đỡ? Liên hệ với chúng tôi
          </p>
          <div className="flex justify-center gap-6 text-[#25A26A]">
            <Link href="/about" className="hover:text-green-600 transition-colors">
              Về chúng tôi
            </Link>
            <span className="text-[#404040]">•</span>
            <Link href="/" className="hover:text-green-600 transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#25A26A] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#268d7c] opacity-5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
