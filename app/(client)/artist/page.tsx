export default function ArtistPage() {
    
    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="/images/jungkook.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mt-5">
                        Khám phá tài năng âm nhạc
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Nghệ sĩ
                    </h3>
                </div>
            </div>

            
        </>
    );
}