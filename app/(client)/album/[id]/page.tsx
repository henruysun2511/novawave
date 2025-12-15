"use client";

import ArtistCard from "@/components/client/ArtistList/artist-card";
import ReportModal from "@/components/client/Report/report-modal";
import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { useAlbumDetail, useSongsInAlbum } from "@/queries/useAlbumQuery";
import { useArtistDetail } from "@/queries/useArtistQuery";
import { useStartPlayer } from "@/queries/usePlayerQuery";
import { ReportTargetType } from "@/types/constant.type";
import { CaretRightFilled, FlagOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { useParams } from "next/navigation";
import { useState } from "react";
const { TextArea } = Input;

export default function AlbumDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const toast = useToast();

    const { data: albumRes, isLoading: albumLoading } = useAlbumDetail(id);
    const album = albumRes?.data;
    console.log(album);

    const { data: artistRes, isPending } = useArtistDetail(album?.artist ?? "");
    const artist = artistRes?.data;

    const { data: songRes } = useSongsInAlbum(id);
    const songs = songRes?.data;


    const { mutate: startPlayerMutation } = useStartPlayer();

    const handlePlayAlbum = () => {
        if (!songs || songs.length === 0) {
            toast.warning("Album không có bài hát nào.");
            return;
        }

        const firstSong = songs[0];
        console.log(firstSong);

        startPlayerMutation({
            songId: firstSong._id,
            albumId: album!._id,
        }, {
            onSuccess: (res) => {
                toast.success(`Bắt đầu phát Album: ${album!.name}`);
                console.log(res.data);
            },
            onError: (err) => {
                toast.error("Không thể phát nhạc. Vui lòng thử lại.");
                console.error(err);
            }
        });
    };

    if (albumLoading) return <div>Loading...</div>;
    if (!album) return <div>Không tìm thấy album</div>;
    if (!artist) return <div>Không tìm thấy artist</div>;

    return (
        <>
            <div className="relative w-full h-[350px]">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7c2d12]" /> */}

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-5 flex items-center p-4">
                    <img className="w-[300px] h-[300px] rounded-xl" src={album?.img || "/images/default-cover.png"} alt="" />
                    <div className="relative z-20">
                        <div className="text-base text-white mt-5 mb-3">
                            Album
                        </div>
                        <h3 className="uppercase text-6xl font-extrabold text-white mb-1 hover:text-green transition">
                            {album?.name || "Đang cập nhật"}
                        </h3>
                        <div className="text-base text-white mb-3 font-bold">
                            {artist?.name || "Đang cập nhât"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-10">
                    <div className="cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg">
                        <CaretRightFilled className="text-3xl"
                            onClick={handlePlayAlbum} />
                    </div>

                    <div
                        className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                        onClick={() => setIsReportModalOpen(true)}
                    >
                        <FlagOutlined className="mr-2" />Report
                    </div>
                </div>


                <Title>Thông tin bài hát</Title>
                <table className="w-full text-left border-collapse text-base">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-3">STT</th>
                            <th className="py-3">Tên bài hát</th>
                            <th className="py-3">Thời lượng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {songs && songs.length > 0 && (
                            songs.map((song, index) => (
                                <tr
                                    key={song._id}
                                    className="hover:bg-[var(--background-tertiary)] transition text-text-primary"
                                >
                                    <td className="py-3">{index + 1}</td>
                                    <td className="py-3">{song?.name || "Đang cập nhật"}</td>
                                    <td className="py-3">
                                        {song?.duration
                                            ? `${Math.floor(song.duration / 60)}:${String(
                                                Math.floor(song.duration % 60)
                                            ).padStart(2, "0")}`
                                            : "Đang cập nhật"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="my-10">
                    <Title>Nghệ sĩ</Title>
                    {isPending ? (
                        <div>Đang tải nghệ sĩ...</div>
                    ) : artist ? (
                        <ArtistCard artist={artist} />
                    ) : (
                        <div>Không tìm thấy nghệ sĩ</div>
                    )}
                </div>

                <div className="my-10"></div>
            </div>

            <ReportModal
                open={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={id}
                targetType={ReportTargetType.ALBUM}
            />
        </>
    )
}