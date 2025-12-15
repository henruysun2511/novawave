"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { JwtPayload } from "@/types/body.type";
import { jwtDecode, } from "jwt-decode";
import { useEffect, useState } from "react";


export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAuth, logout } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      setReady(true);
      return;
    }

    try {
      const user = jwtDecode<JwtPayload>(token);

      if (user.exp * 1000 < Date.now() + 30_000) {
        logout();
        sessionStorage.removeItem("accessToken");
        setReady(true);
        return;
      }

      setAuth(token, user);
    } catch {
      logout();
      sessionStorage.removeItem("accessToken");
    } finally {
      setReady(true);
    }
  }, [setAuth, logout]);

  if (!ready) return null; // hoặc loading

  return <>{children}</>;
}