import Title from "@/components/ui/title";

export default function NewsPage() {
    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="https://i.pinimg.com/1200x/80/73/eb/8073eb44c4d2f41837bbeaedc976d4b6.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Tin tức âm nhạc mới nhất trong ngày
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        MUSIC NEWS
                    </h3>
                </div>
            </div>

            <Title>Chưa có tin tức nào</Title>
        </>
    );
}