"use client";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export default function SongInfo() {
    const hidePanel = useSidebarStore((s) => s.hideRightPanel);

    return (
        <div className="bg-[var(--background-secondary)] rounded-2xl overflow-scroll scrollbar-hidden w-full h-full">
            {/* Video nền */}
            <div className=" relative ">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                >
                    <source src="/videos/Download.mp4" type="video/mp4" />
                </video>

                {/* Nút Ẩn */}
                <Tooltip title="Ẩn chế độ xem Đang phát" placement="right">
                    <MenuFoldOutlined
                        className="absolute top-5 left-5 z-20 text-white cursor-pointer"
                        onClick={hidePanel}
                    />
                </Tooltip>
            </div>


            {/* Thông tin bài hát */}
            <div className="w-full p-5 -mt-[130px] relative z-10">
                <h1 className="text-3xl text-text-primary uppercase font-extrabold mb-1.5">
                    Có ai hẹn hò cùng em chưa?
                </h1>
                <h3 className="text-base text-text-primary mb-6 font-extrabold">Quân Ap</h3>

                <div className="gap-4 bg-[var(--background-secondary)] rounded-xl  my-1.5">
                    <img
                        className="w-full h-full object-cover rounded-t-xl"
                        src="https://photo-zmp3.zadn.vn/avatars/4/e/9/e/4e9e34312435973c052bab49765f84a2.jpg"
                        alt="Quân Ap"
                    />
                    <div className="bg-[var(--background-tertiary)] rounded-b-xl p-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <h3 className="text-base text-text-primary font-extrabold">Quân Ap</h3>
                            <button className="px-3 py-1 bg-green text-white rounded-full text-sm">
                                Theo dõi
                            </button>
                        </div>
                        <p className="text-sm text-text-primary mb-2">843.599 lượt nghe hàng tháng</p>
                        <p className="text-sm text-gray-400 line-clamp-5">
                            Quân A.P, tên thật là Phạm Anh Quân, là một nam ca sĩ người Việt sinh năm 1997 tại Hà Nội. Anh nổi tiếng với những bản hit như &quot;Bông Hoa Đẹp Nhất&quot;, &quot;Tự Nắm Tay Mình&quot; và được biết đến với biệt danh &quot;hotboy cover&quot; nhờ những video cover ca khúc triệu view trước khi chính thức ra mắt. Quân A.P từng theo học tại trường Đại học Văn hóa Nghệ thuật Quân đội và là một trong những gương mặt nổi bật trong chương trình &quot;Anh trai say hi&quot; năm 2024.
                        </p>
                    </div>

                </div>

                <div className="bg-[var(--background-tertiary)] rounded-xl my-3 p-4">
                    <h3 className="text-base text-text-primary font-extrabold mb-3">Nghệ sĩ cùng tham gia</h3>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base text-text-primary">Huy sun</h3>
                        <button className="px-3 py-1 bg-green text-white rounded-full text-sm cursor-pointer">
                            Theo dõi
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base text-text-primary">Đặng Tú</h3>
                        <button className="px-3 py-1 bg-green text-white rounded-full text-sm cursor-pointer">
                            Theo dõi
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}




