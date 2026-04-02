import { useAlbumDetail } from "@/queries/useAlbumQuery";
import { Divider, Image, Modal } from "antd";
import dayjs from "dayjs";

interface Props {
    open: boolean;
    onClose: () => void;
    albumId?: string;
}

export default function ArtistAlbumDetailModal({
    open,
    onClose,
    albumId,
}: Props) {
    // Lấy thông tin Album chi tiết
    const { data, isFetching } = useAlbumDetail(albumId ?? "");
    const album = data?.data;
    console.log(albumId)
    console.log(album)

    if (!album) {
        return (
            <Modal open={open} onCancel={onClose} footer={null} width={650} title="Chi tiết Album">
                {isFetching ? "Đang tải..." : "Không tìm thấy Album."}
            </Modal>
        );
    }
    
    return (
        <Modal open={open} onCancel={onClose} footer={null} width={650} title="Chi tiết Album">
            {isFetching ? (
                "Đang tải..."
            ) : (
                <div className="space-y-3">
                    <Image
                        src={album.img} 
                        alt={album.name}
                        className="w-40 rounded-lg mb-4"
                    />

                    <p><b>Tên Album:</b> {album.name}</p>
                    <p><b>Loại Album:</b> {album.album_type}</p> 
                    <p><b>Số bài hát:</b> {album.total_songs}</p> 
                    <p><b>Ngày phát hành:</b> {dayjs(album.release_date).format('DD/MM/YYYY')}</p> 
                    <p><b>Label:</b> {album.label || "Không có"}</p> 

                    <Divider />
                </div>
            )}
        </Modal>
    );
}