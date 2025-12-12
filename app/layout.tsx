"use client"
import AuthInitializer from "@/components/route/AuthInit";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";
import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [qc] = useState(() => new QueryClient());

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { showInfo, hideRightPanel } = useSidebarStore();

  useEffect(() => {
    if (isAuthenticated) {
      showInfo();     
    } else {
      hideRightPanel(); 
    }
  }, [isAuthenticated]);

  return (
    <html lang="en">
      <body
      >
        <AntdApp>
          <QueryClientProvider client={qc}>
            <AuthInitializer>
              {children}
            </AuthInitializer>
          </QueryClientProvider>
        </AntdApp>

      </body>
    </html>
  );
}
