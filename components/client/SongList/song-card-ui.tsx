import { CaretRightFilled } from "@ant-design/icons";

export default function SongCardUi() {
    return (
        <>
            <div className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">

                {/* Ảnh */}
                <div className="relative w-full h-full">

                    <img
                        className="w-full h-full object-cover rounded-xl"
                        src="https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/8/c/1/6/8c166e2b9a0e45ca9a6c7bef40a81f74.jpg"
                        alt=""
                    />

                    {/* Overlay mờ khi hover */}
                    <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                    {/* Nút play */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                        <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-3xl"/>
                        </div>
                    </div>

                </div>

                {/* Text */}
                <a className="text-base text-text-primary font-bold mt-2">
                    Mất kết nối
                </a>
                <a className="text-sm text-gray-400">Dương Domic</a>

            </div>
        </>
    );
}