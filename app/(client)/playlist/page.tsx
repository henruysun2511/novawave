export default function PlaylistPage() {
    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="https://i.pinimg.com/1200x/d2/db/46/d2db46bec14fd1ad56d883140f4ddd64.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Dành cho bạn
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        PLAYLIST THỊNH HÀNH
                    </h3>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 p-6">Trang playlist</h2>
        </>
    );
}