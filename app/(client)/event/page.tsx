export default function EventPage() {
    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="https://i.pinimg.com/1200x/84/5b/c7/845bc74d9403f7bf2a77ead71d01a9a7.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mt-5">
                        Đừng bỏ lỡ cơ hội tham gia
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Sự kiện âm nhạc 2025
                    </h3>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 p-6">Trang sự kiện</h2>
        </>
    );
}