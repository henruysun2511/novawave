import type { Metadata } from "next";
import "./globals.css";

// Các Provider và Store
import AuthInitializerProvider from "@/components/provider/AuthInitProvider";
import { NotificationProvider } from "@/components/provider/NotificationProvider";
import QueryProvider from "@/components/provider/QueryProvider";
import SocketProvider from "@/components/provider/SocketProvider";
import { App as AntdApp, ConfigProvider } from "antd";
import { LayoutClient } from "./layout-client";

export const metadata: Metadata = {
  // metadataBase: new URL("https://novawave.vercel.app"),
  title: {
    default: "Novawave - Nền tảng nghe nhạc trực tuyến & Phòng stream chung",
    template: "%s | Novawave"
  },
  description: "Trải nghiệm âm nhạc chất lượng cao, tạo phòng nghe nhạc cùng bạn bè và khám phá những album mới nhất trên Novawave. Kết nối cộng đồng yêu nhạc đỉnh cao.",
  keywords: [
    "music streaming",
    "nghe nhạc trực tuyến",
    "phòng nghe nhạc",
    "novawave",
    "listen together",
    "âm nhạc chất lượng cao",
    "social music",
    "tạo playlist"
  ],
  authors: [{ name: "Novawave Team", url: "https://novawave.vercel.app" }],
  creator: "Novawave",
  publisher: "Novawave",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://novawave.vercel.app",
    title: "Novawave - Kết nối đam mê âm nhạc",
    description: "Nền tảng nghe nhạc trực tuyến hàng đầu hỗ trợ tạo phòng nghe chung thời gian thực.",
    siteName: "Novawave",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Novawave Music Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novawave - Music Streaming",
    description: "Listen to music together with your friends in real-time.",
    images: ["/images/logo.png"],
    creator: "@novawave",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "music",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#10b981",
                borderRadius: 12,
              },
            }}
          >
            <AntdApp>
              <AuthInitializerProvider>
                <NotificationProvider>
                  <SocketProvider />
                  <LayoutClient>{children}</LayoutClient>
                </NotificationProvider>
              </AuthInitializerProvider>
            </AntdApp>
          </ConfigProvider>
        </QueryProvider>
      </body>
    </html>
  );
}