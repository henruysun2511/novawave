export default function PlaylistDetailPage() {
    return (
        <>
            <div className="relative w-full h-[450px]">
                <div className=" w-full h-full object-cover rounded-2xl bg-pink-400"></div>

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full flex gap-3.5 items-end">
                    <img className="w-[150px] h-[150px]" src="" alt="" />
                    <div>
                        <div className="text-base text-white mb-1">
                            hehee
                        </div>
                        <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                            PLAYLIST CHo LInh
                        </h3>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 p-6">Trang playlist</h2>


            <div>
                <div></div>
            </div>
        </>
    )
}