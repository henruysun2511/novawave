"use client";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setReady(true);
      return;
    }

    // Set token vào Zustand
    setAccessToken(token);

    // Fetch thông tin người dùng
    authService
      .me()
      .then((user) => {
        setUser(user);
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  if (!ready) return null; 

  return <>{children}</>;
}