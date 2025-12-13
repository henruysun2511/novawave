"use client";

import { WavePlayer } from "@/components/client/WavePlayer/wave-player";
import Title from "@/components/ui/title";
import { useSongDetail } from "@/queries/useSongQuery";
import { CaretRightFilled, HeartFilled, PlusOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { useParams } from "next/navigation";
import LyricsPreview from "../lyrics-preview";
const { TextArea } = Input;

export default function SongDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useSongDetail(id);

    if (isLoading) return <div>Loading...</div>;
    if (!data?.data) return <div>Không tìm thấy bài hát</div>;

    const song = data.data;
    const lyrics = ""

    return (
        <>
            <div className="relative w-full h-[350px]">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7c2d12]" /> */}

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-5 flex items-center p-4">
                    <img className="w-[300px] h-[300px] rounded-xl" src={song?.imageUrl || "/images/default-cover.png"} alt="" />
                    <div className="relative z-20">
                        <div className="text-base text-white mt-5 mb-3">
                            Đĩa đơn
                        </div>
                        <h3 className="uppercase text-6xl font-extrabold text-white mb-1 hover:text-green transition">
                            {song?.name || "Đang cập nhật"}
                        </h3>
                        <div className="text-base text-white mb-3 font-bold">
                            {song?.artist.name}
                        </div>
                        <WavePlayer url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-3xl" />
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                        >
                            <HeartFilled className="mr-2" /> Yêu thích
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                        >
                            <PlusOutlined className="mr-2" />Thêm vào playlist
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mb-10 text-text-secondary text-base">
                        <div>
                            <CaretRightFilled className="mr-2" />
                            {song?.playCount ?? "Đang cập nhật"}
                        </div>

                        <div>
                            <HeartFilled className="mr-2" />
                            {song?.likesCount ?? "Đang cập nhật"}
                        </div>
                    </div>
                </div>

                <Title>Thông tin bài hát</Title>
                <table className="w-full text-left border-collapse text-base">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-3">STT</th>
                            <th className="py-3">Tên bài hát</th>
                            <th className="py-3">Album</th>
                            <th className="py-3">Nghệ sĩ</th>
                            <th className="py-3">Thời lượng</th>
                            <th className="py-3">Ngày phát hành</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="hover:bg-[var(--background-tertiary)] transition text-text-primary">
                            <td className="py-3">1</td>

                            <td className="py-3 flex items-center gap-4">
                                <img
                                    className="w-[50px] h-[50px] object-cover"
                                    src={song?.imageUrl || "/images/default-cover.png"}
                                    alt=""
                                />
                                <p>{song?.name || "Đang cập nhật"}</p>
                            </td>

                            <td className="py-3">
                                {song?.album?.name || "Đang cập nhật"}
                            </td>

                            <td className="py-3">
                                {song?.artist?.name || "Đang cập nhật"}
                            </td>

                            <td className="py-3">
                                {song?.duration
                                    ? `${Math.floor(song.duration / 60)}:${String(Math.floor(song.duration % 60)).padStart(2, "0")}`
                                    : "Đang cập nhật"}
                            </td>

                            <td className="py-3">
                                {song?.createdAt
                                    ? new Date(song.createdAt).toLocaleDateString("vi-VN")
                                    : "Đang cập nhật"}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="my-10"></div>
                <Title>Nghệ sĩ cùng tham gia</Title>
                 {song?.featArtistIds?.map((a: any) => a.name).join(", ") || "Không có nghệ sĩ khác tham gia"}

                <div className="my-10"></div>
                <Title>Lời bài hát</Title>
                <LyricsPreview lyrics={song?.lyrics || "Đang cập nhật"} />

                <div className="my-10"></div>
                <Title>Bình luận</Title>
                <div className="">
                    <TextArea className="w-[100%]" size='large' placeholder="Nhập bình luận của bạn" allowClear />
                </div>

                <div>
                    <div className="flex gap-5 items-start my-8">
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src="https://img2.51gt3.com/rac/racer/202503/fe2de9975d864e38acfd9933164954a6.png?x-oss-process=style/_nowm" alt="" />
                        <div>
                            <div className="flex gap-3 items-center mb-2">
                                <div className="text-xl font-bold text-green">Hoàng tử Monaco</div>
                                <div className="text-text-secondary border boder-white rounded-sm px-2 py-0.5 font-bold cursor-pointer text-sm">00:50</div>
                                <div className="text-text-secondary text-base">3 giờ trước</div>
                            </div>
                            <div className="text-text-primary text-base">Bài này hay quá</div>
                        </div>
                    </div>
                    <div className="flex gap-5 items-start my-8">
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src="https://img2.51gt3.com/rac/racer/202503/fe2de9975d864e38acfd9933164954a6.png?x-oss-process=style/_nowm" alt="" />
                        <div>
                            <div className="flex gap-3 items-center mb-2">
                                <div className="text-xl font-bold text-green">Hoàng tử Monaco</div>
                                <div className="text-text-secondary border boder-white rounded-sm px-2 py-0.5 font-bold cursor-pointer text-sm">00:50</div>
                                <div className="text-text-secondary text-base">3 giờ trước</div>
                            </div>
                            <div className="text-text-primary text-base">Bài này hay quá, nghe xong khóc luôn</div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}