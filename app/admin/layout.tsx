import SideBar from "@/components/admin/sidebar/sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex">
                <div className="w-[15%]">
                    <SideBar />
                </div>
                <div className="w-[85%]">
                    {/* <Header /> */}
                    <div className="px-10 py-15 bg-custom-gradient">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}