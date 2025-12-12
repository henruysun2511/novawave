"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    sessionStorage.setItem("accessToken", token);

    const user = jwtDecode(token);
    setAuth(token, user);

    router.replace("/");
  }, []);

  return null;
}