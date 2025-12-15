"use client";

import { useNotificationSocket } from "@/libs/notifcation";
import { connectSocket, disconnectSocket } from "@/libs/socket";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";


export default function SocketProvider() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) connectSocket();
    return () => disconnectSocket();
  }, [isAuthenticated]);

  useNotificationSocket();

  return null;
}