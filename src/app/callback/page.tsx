"use client";

import { getCookieValue } from "@/libs/getCookieValue";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserJwtPayload } from "@/types/body.type";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {

    const token = getCookieValue("accessToken");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const user = jwtDecode<UserJwtPayload>(token);
      setAuth(token, user);
      router.replace("/");
    } catch {
      router.push("/auth/login");
    }
  }, []);

  return null;
}