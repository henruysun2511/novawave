import { Artist } from "@/types/object.type";
import dayjs from "dayjs";

export default function ArtistProfileInfo({artist} : {artist: Artist}) {

    return (
        <>

            <div className="relative w-full h-[450px]">
                {
                    artist.bannerUrl ? (
                        <img
                            src={artist.bannerUrl}
                            alt="Logo"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    ) : (
                        <div className="w-full h-full object-cover rounded-2xl bg-[var(--background-secondary)] flex justify-center items-center font-bold text-text-primary">Chưa cập nhật ảnh banner</div>
                    )
                }

                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        {artist.name}
                    </h3>
                </div>
            </div>

            <div className="my-10 space-y-8">

                {/* Meta info */}
                <div className="flex gap-6 text-sm text-gray-400">
                    <span>
                        Tạo lúc {dayjs(artist.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span>
                        Cập nhật lần cuối {dayjs(artist.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                </div>

                <div className="grid grid-cols-12 gap-8 items-start">
                    <div className="col-span-3 space-y-6">
                        <div className="bg-[var(--background-tertiary)] rounded-2xl p-6 shadow">
                            <h3 className="text-4xl font-extrabold text-white">
                                {artist.followers}
                            </h3>
                            <p className="text-gray-400 mt-1">Người theo dõi</p>
                        </div>

                        <div className="bg-[var(--background-tertiary)] rounded-2xl p-6 shadow">
                            <h3 className="text-xl font-bold text-white">
                                {artist.country || "Chưa cập nhật"}
                            </h3>
                            <p className="text-gray-400 mt-1">Quốc gia</p>
                        </div>
                    </div>

                    <div className="col-span-5 flex justify-center">
                        {artist.avatarUrl ? (
                            <img
                                className="w-[420px] h-[420px] rounded-3xl object-cover shadow-xl"
                                src={artist.avatarUrl}
                                alt="artist avatar"
                            />
                        ) : (
                            <div className="w-[420px] h-[420px] rounded-3xl flex items-center justify-center bg-[var(--background-tertiary)] text-gray-400">
                                Chưa cập nhật ảnh đại diện
                            </div>
                        )}
                    </div>

                    <div className="col-span-4">
                        <div className="bg-[var(--background-tertiary)] rounded-2xl p-6 shadow h-full">
                            <h3 className="text-white text-2xl font-extrabold mb-4">
                                Tiểu sử
                            </h3>

                            <p className="text-gray-300 leading-relaxed">
                                {artist.biography || "Chưa cập nhật tiểu sử nghệ sĩ"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}