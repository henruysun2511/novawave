"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useEffect } from "react";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { showInfo, hideRightPanel } = useSidebarStore();

  useEffect(() => {
    if (isAuthenticated) showInfo();
    else hideRightPanel();
  }, [isAuthenticated, showInfo, hideRightPanel]);

  return <>{children}</>;
}