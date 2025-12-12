"use client";
import Header from "@/components/client/header/header";
import SideBar from "@/components/client/sidebar/sidebar";
import SongBar from "@/components/client/SongBar/song-bar";
import SongInfo from "@/components/client/SongInfo/song-info";
import SongQueue from "@/components/client/SongQueue/song-queue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";

import { Splitter } from "antd";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { rightPanelMode, middleSize } = useSidebarStore();
  const { isAuthenticated } = useAuthStore();

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
          {/* Sidebar */}
          <Splitter.Panel min="10%">
            <SideBar />
          </Splitter.Panel>

          {/* Main */}
          <Splitter.Panel defaultSize={middleSize} min="65%">
            <div className="h-full bg-custom-gradient rounded-2xl overflow-y-auto scrollbar-hidden">
              {children}
            </div>
          </Splitter.Panel>

          {/* Song Info */}
          {isAuthenticated && rightPanelMode !== "hidden" && (
            <Splitter.Panel min="15%">
              {rightPanelMode === "info" && <SongInfo />}
              {rightPanelMode === "queue" && <SongQueue />}
            </Splitter.Panel>
          )}

        </Splitter>

        {
          isAuthenticated && (<SongBar />)
        }

      </div>
    </>
  );
}

