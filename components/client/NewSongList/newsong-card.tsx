import { CaretRightFilled } from "@ant-design/icons";

export default function NewSongCard() {
    return (
        <>
            <div className="group flex items-center cursor-pointer my-2 w-full rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">
                <div className="relative w-[70px] h-[70px]">
                    <img
                        className="w-full h-full object-cover"
                        src="https://i.scdn.co/image/ab67616d0000b2732922307c16bb852a0849bea0"
                        alt=""
                    />

                    <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                        <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-xs" />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-center ml-4">
                    <a className="text-base text-text-primary font-bold">
                        Anh đã quen với cô đơn
                    </a>
                    <a className="text-sm text-gray-400">Soobin Hoàng Sơn</a>
                </div>


            </div>
        </>
    );
}