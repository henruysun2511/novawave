"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { UserJwtPayload } from "@/types/body.type";
import { jwtDecode, } from "jwt-decode";
import { useEffect, useState } from "react";


export default function AuthInitializerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAuth, logout } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    }
    const token = getCookie("accessToken");
    const roleName = getCookie("roleName");

    if (!token) {
      setReady(true);
      return;
    }

    try {
      const user = jwtDecode<UserJwtPayload>(token);

      if (user.exp * 1000 < Date.now() + 30_000) {
        logout();
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
        document.cookie = "roleName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
        setReady(true);
        return;
      }

      setAuth(token, user);
      if (roleName) useAuthStore.getState().setRoleName(roleName);
    } catch {
      logout();
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
      document.cookie = "roleName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    } finally {
      setReady(true);
    }
  }, [setAuth, logout]);

  if (!ready) return null; // hoặc loading

  return <>{children}</>;
}