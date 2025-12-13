import { useToast } from "@/libs/toast";
import { useSongDetail, useUpdateSongStatus } from "@/queries/useSongQuery";
import { SongStatus } from "@/types/constant.type";
import { Modal, Space, Switch } from "antd";
import { useEffect, useState } from "react";


interface Props {
    open: boolean;
    onCancel: () => void;
    songId?: string;
}

export default function ArtistSongUpdateStatusModal({
    open,
    onCancel,
    songId,
}: Props) {
    const toast = useToast();
    const { mutate, isPending } = useUpdateSongStatus();

    const { data } = useSongDetail(songId ?? "");
    const currentStatus = data?.data.status;


    const [status, setStatus] = useState<SongStatus>(currentStatus ?? SongStatus.INACTIVE);

    useEffect(() => {
        if (currentStatus !== undefined) {
            setStatus(currentStatus);
        }
    }, [currentStatus, songId]);

    const handleSubmit = () => {
        if (!songId) return;

        const payload = { songId, status };
        console.log(payload)

        mutate(payload, {
            onSuccess: (res) => {
                toast.success(res.data.message);
                onCancel();
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Cập nhật thất bại");
            },
        });
    };

    return (
        <Modal
            open={open}
            title="Cập nhật trạng thái bài hát"
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={isPending}
            okText="Cập nhật"
            cancelText="Hủy"
        >
            <Space direction="vertical">
                <Switch
                    checked={status === SongStatus.ACTIVE}
                    checkedChildren="Kích hoạt"
                    unCheckedChildren="Ẩn"
                    onChange={(checked) =>
                        setStatus(checked ? SongStatus.ACTIVE : SongStatus.INACTIVE)
                    }
                />
            </Space>
        </Modal>
    );
}