import { EnvironmentFilled } from "@ant-design/icons";

export default function EventCard() {
    return (
        <>
            <div className="relative w-full h-64 bg-card-bg rounded-xl shadow-md overflow-hidden">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://ca-times.brightspotcdn.com/dims4/default/f854f6b/2147483647/strip/true/crop/5568x3712+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Faa%2F18%2Fe54c32e242b684c943ea0cf6c222%2Fap21310170175809.jpg"
                    alt=""
                />

                <div className="absolute inset-0 bg-black/50"></div>
            
                <div className="base-button absolute z-20 top-5 left-5 !bg-[var(--background-tertiary)] hover:!bg-green font-bold">
                    Mua vé
                </div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-sm text-white/90 mb-1">
                        <span>28 Tháng 11, 2025</span> — <span>20:00</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 cursor-pointer hover:text-green transition">
                        Travis Scott Concert
                    </h3>
                    <p className="text-sm text-white/90 flex items-center">
                        <EnvironmentFilled className="mr-2 text-green text-lg" />
                        1 Đ. Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội
                    </p>
                </div>
            </div>
        </>
    );
}