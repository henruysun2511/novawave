"use client";
import Header from "@/components/client/Layout/header";
import SideBar from "@/components/client/Layout/sidebar";
import SongBar from "@/components/client/Player/song-bar";
import SongInfo from "@/components/client/Player/song-info";
import SongQueue from "@/components/client/Player/song-queue";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";

import { Splitter } from "antd";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { rightPanelMode, middleSize } = useSidebarStore();
  const { isAuthenticated } = useAuthStore();
  const { isDesktop, isTablet } = useIsMobile();

  // Mobile layout - fullscreen
  if (!isDesktop) {
    return (
      <>
        <div className="pb-20 md:pb-24">
          <Header />
          <div className="h-[calc(100vh-64px-80px)] md:h-[calc(100vh-64px-96px)] bg-custom-gradient rounded-2xl overflow-y-auto scrollbar-hidden mx-2 md:mx-4 mt-2 md:mt-4">
            {children}
          </div>
        </div>
        {isAuthenticated && <SongBar />}
      </>
    );
  }

  // Desktop layout - with splitter
  return (
    <>
      <div className="pb-16">
        <Header />

        <Splitter
          lazy
          style={{
            height: "100vh",
            gap: "5px",
          }}
          key={middleSize}
        >
          {/* Sidebar - Always visible on desktop */}
          <Splitter.Panel min="10%" max="20%">
            <SideBar />
          </Splitter.Panel>

          {/* Main Content */}
          <Splitter.Panel defaultSize={middleSize} min="65%">
            <div className="h-full bg-custom-gradient rounded-2xl overflow-y-auto scrollbar-hidden">
              {children}
            </div>
          </Splitter.Panel>

          {/* Right Panel - Song Info or Queue */}
          {isAuthenticated && rightPanelMode !== "hidden" && (
            <Splitter.Panel min="15%" max="30%">
              {rightPanelMode === "info" && <SongInfo />}
              {rightPanelMode === "queue" && <SongQueue />}
            </Splitter.Panel>
          )}
        </Splitter>

        {isAuthenticated && <SongBar />}
      </div>
    </>
  );
}

