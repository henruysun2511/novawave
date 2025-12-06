import Header from "@/components/admin/header/header";
import SideBar from "@/components/admin/sidebar/sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex">
                <div className="w-[15%]">
                    <SideBar />
                </div>
                <div className="w-[85%]">
                    <Header />
                    {children}
                </div>
            </div>
        </>
    );
}