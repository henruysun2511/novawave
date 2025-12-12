import { useToast } from "@/libs/toast";
import { useUpdateVerification } from "@/queries/useArtistQuery";
import { VerificationStatus } from "@/types/constant.type";
import { Input, Modal } from "antd";
import { useState } from "react";


export default function VerificationRejectModal({
    open,
    onCancel,
    data,
}: {
    open: boolean;
    onCancel: () => void;
    data: any;
}) {
    const [reason, setReason] = useState("");
    const { mutate: updateStatus } = useUpdateVerification();
    const toast = useToast();

    const handleSubmit = () => {
        if (!reason.trim()) {
            toast.error("Vui lòng nhập lý do từ chối");
            return;
        }

        updateStatus(
            {
                id: data?._id,
                data: { status: VerificationStatus.REJECTED, rejectReason: reason },
            },
            {
                onSuccess: (res) => {
                    toast.success(res?.data?.message || "Từ chối thành công");
                    setReason("");
                    onCancel();
                },
                onError: (error: any) => {
                    const msg =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Có lỗi xảy ra";
                    toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                },
            }
        );
    };

    return (
        <Modal
            open={open}
            title="Nhập lý do từ chối"
            onCancel={() => {
                setReason("");
                onCancel();
            }}
            onOk={handleSubmit}
        >
            <Input.TextArea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do từ chối..."
            />
        </Modal>
    );
}
