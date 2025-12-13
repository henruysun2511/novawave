import { useSongDetail } from "@/queries/useSongQuery";
import { Divider, Image, Modal, Tag } from "antd";

interface Props {
    open: boolean;
    onClose: () => void;
    songId?: string;
}

export default function ArtistSongDetailModal({
    open,
    onClose,
    songId,
}: Props) {
    const { data, isFetching } = useSongDetail(songId ?? "");

    const song = data?.data;
    console.log(data);

    if (!song) return null;

    return (
        <Modal open={open} onCancel={onClose} footer={null} width={650} title="Chi tiết bài hát">
            {isFetching ? (
                "Đang tải..."
            ) : (
                <div className="space-y-3">
                    <Image
                        src={song.imageUrl}
                        alt={song.name}
                        className="w-40 rounded-lg mb-4"
                    />

                    <p><b>Tên:</b> {song.name}</p>
                    <p><b>Nghệ sĩ:</b> {song.artist?.name}</p>
                    <p><b>Thời lượng:</b> {Math.floor(song.duration / 60)} phút</p>
                    <p><b>Trạng thái:</b> {song.releseStatus} </p>

                    <Divider />

                    <p><b>Thể loại:</b></p>
                    <div className="flex gap-2 flex-wrap">
                        {song.genreNames.map((g: string) => (
                            <Tag key={g}>{g}</Tag>
                        ))}
                    </div>

                    <Divider />
                    <p><b>Album:</b></p>
                    <div className="flex gap-2 flex-wrap">
                        <Tag>{song?.albumId?.name ? song.albumId.name : "Chưa gán album"}</Tag>
                    </div>

                    <Divider />

                    <p><b>Nghệ sĩ hợp tác:</b></p>
                    {song.featArtists?.length ? (
                        song.featArtists.map((a: any) => (
                            <Tag key={a._id} color="blue">
                                {a.name}
                            </Tag>
                        ))
                    ) : (
                        <span>Không có</span>
                    )}

                    <Divider />

                    <Divider />
                    <p><b>Lượt thích:</b></p>
                    <div className="flex gap-2 flex-wrap">
                        <Tag>{song.likesCount}</Tag>
                    </div>

                    <Divider />

                    <p><b>Explicit:</b> {song.explicit ? "Có" : "Không"}</p>

                    {song.explicit && (
                        <>
                            <Divider />
                            <p><b>Lyrics:</b></p>
                            <pre className="bg-slate-800 p-3 rounded text-white">
                                {song.lyrics}
                            </pre>
                        </>
                    )}

                    <Divider />

                    <audio controls src={song.mp3Link} className="w-full" />
                </div>
            )}
        </Modal>
    );
}