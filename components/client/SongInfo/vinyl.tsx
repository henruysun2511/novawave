
const DEFAULT_VINYL_IMG = "/images/default-vinyl.png"; // đặt trong public/images

export default function Vinyl({ img }: { img?: string }) {
    const imageSrc = img || DEFAULT_VINYL_IMG;

    return (
        <div className="flex items-center justify-center h-full">
            <div className="spin-slow w-[220px] h-[220px] rounded-full bg-black shadow-2xl flex items-center justify-center">
                <div className="w-[190px] h-[190px] rounded-full bg-neutral-800 flex items-center justify-center">
                    
                    <div className="w-[90px] h-[90px] rounded-full bg-orange-400 p-1">
                        <img
                            src={imageSrc}
                            alt="vinyl"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}