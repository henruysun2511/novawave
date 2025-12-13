import SideBar from "@/components/admin/sidebar/sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <div className="w-[15%] flex-shrink-0">
                    <SideBar />
                </div>

                <div className="w-[85%] flex flex-col">
                    {/* <Header /> */}

                    <div className="flex-1 overflow-y-auto px-10 py-8 bg-custom-gradient scrollbar-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}