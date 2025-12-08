"use client"
import AuthInitializer from "@/components/route/AuthInit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [qc] = useState(() => new QueryClient());

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
