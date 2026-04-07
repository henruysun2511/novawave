"use client";

import { getCookieValue } from "@/libs/getCookieValue";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserJwtPayload } from "@/types/body.type";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    // Lấy accessToken từ cookie (đã được backend set trước đó)
    const token = getCookieValue("accessToken");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const user = jwtDecode<UserJwtPayload>(token);
      setAuth(token, user);
      
      // Đồng bộ thông tin người dùng xong thì về trang chủ
      router.replace("/");
    } catch {
      router.push("/auth/login");
    }
  }, [router, setAuth]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-4 text-emerald-500 font-medium">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}