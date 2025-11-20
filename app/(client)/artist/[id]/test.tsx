import { CaretRightFilled } from "@ant-design/icons";

export default function TestArtistPage() {
    return (
        <>
             <div className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl hover:bg-[var(--background-tertiary)] p-2 transition">

                {/* Ảnh */}
                <div className="relative w-full h-full">

                    <img
                        className="w-full h-full object-cover rounded-xl"
                        src="https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316"
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
                    Seven
                </a>
                <a className="text-sm text-gray-400">2023</a>


            </div>

        </>
    );
}