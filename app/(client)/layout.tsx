import Header from "@/components/client/header/header";
import SideBar from "@/components/client/sidebar/sidebar";
import SongBar from "@/components/client/SongBar/song-bar";
import SongInfo from "@/components/client/SongInfo/song-info";
import { Splitter } from "antd";


export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <Splitter lazy style={{ gap: "5px", height: "100vh", boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <Splitter.Panel>
                    <SideBar />
                </Splitter.Panel>

                <Splitter.Panel defaultSize="70%" min="65%" max="70%">
                    <div className="h-full p-6 bg-[var(--background-secondary)] rounded-2xl overflow-y-auto scrollbar-hidden">
                        {children}
                    </div>
                </Splitter.Panel>

                <Splitter.Panel>
                    <SongInfo />
                </Splitter.Panel>

            </Splitter>

            <SongBar />
        </>
    );
}