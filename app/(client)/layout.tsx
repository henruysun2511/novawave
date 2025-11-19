"use client";
import Header from "@/components/client/header/header";
import SideBar from "@/components/client/sidebar/sidebar";
import SongBar from "@/components/client/SongBar/song-bar";
import SongInfo from "@/components/client/SongInfo/song-info";
import { Splitter } from "antd";
import { useState } from "react";


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isPlayingView, setIsPlayingView] = useState(true);
    const [middleSize, setMiddleSize] = useState("70%");

    const togglePlayingView = () => {
        setIsPlayingView(prev => {
            const newValue = !prev;
            setMiddleSize(newValue ? "70%" : "85%");
            return newValue;
        });
    };

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
                    key={middleSize} // để render lại khi size thay đổi
                >
                    {/* Panel Sidebar */}
                    <Splitter.Panel min="10%">
                        <SideBar />
                    </Splitter.Panel>

                    {/* Panel chính */}
                    <Splitter.Panel defaultSize={middleSize} min="65%">
                        <div className="h-full p-6 bg-custom-gradient rounded-2xl overflow-y-auto scrollbar-hidden">
                            {children}
                        </div>
                    </Splitter.Panel>

                    {/* Panel Song Info */}
                    {isPlayingView && (
                        <Splitter.Panel min="15%">
                            <SongInfo
                                setIsPlayingView={setIsPlayingView}
                                setMiddleSize={setMiddleSize}
                            />
                        </Splitter.Panel>
                    )}
                </Splitter>

                <SongBar togglePlayingView={togglePlayingView} />
            </div>

        </>
    );
}

