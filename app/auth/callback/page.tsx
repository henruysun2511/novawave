"use client";

import { useToast } from "@/libs/toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { JwtPayload } from "@/types/body.type";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function GoogleCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const toast = useToast();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      toast.error("Đăng nhập Google thất bại");
      router.replace("/auth/login");
      return;
    }

    sessionStorage.setItem("accessToken", token);

    const user = jwtDecode<JwtPayload>(token);
    console.log(user)
    setAuth(token, user);

    toast.success(`Đăng nhập thành công`);


    setTimeout(() => {
      router.replace("/");
    }, 500); 
  }, []);

  return (
    null
  );
}