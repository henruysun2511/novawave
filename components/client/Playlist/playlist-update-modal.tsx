import { Button, Form, Input, Modal, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

// Giả định các imports cần thiết
import { useToast } from "@/libs/toast";
import { useUpdatePlaylist } from "@/queries/usePlaylistQuery"; // Hook update đã được tạo ở bước trước
// Giả định Enum Status
export enum PlaylistStatus {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

const { TextArea } = Input;

// Giả định interface của Playlist (dựa trên các trường form)
interface Playlist {
    _id: string;
    name: string;
    description?: string;
    status: PlaylistStatus.PUBLIC | PlaylistStatus.PRIVATE;
    // ... các trường khác
}

interface PlaylistUpdateModalProps {
    open: boolean;
    onCancel: () => void;
    currentPlaylist: Playlist | null; // Dữ liệu playlist cần chỉnh sửa
}

export default function PlaylistUpdateModal({
    open,
    onCancel,
    currentPlaylist,
}: PlaylistUpdateModalProps) {
    const [form] = useForm();
    const toast = useToast();
    const { mutate, isPending } = useUpdatePlaylist();


    useEffect(() => {
        if (currentPlaylist) {
            form.setFieldsValue({
                name: currentPlaylist.name,
                description: currentPlaylist.description,
                status: currentPlaylist.status === PlaylistStatus.PUBLIC, 
            });
        }
    }, [currentPlaylist, form]);

    const handleFinish = (values: any) => {
        if (!currentPlaylist?._id) {
            toast.error("Không tìm thấy ID Playlist để cập nhật.");
            return;
        }

        // Chuẩn bị payload
        const payload = {
            ...values,
            status: values.status
                ? PlaylistStatus.PUBLIC
                : PlaylistStatus.PRIVATE,
        };

        // Gọi mutation để cập nhật
        mutate({ id: currentPlaylist._id, data: payload }, {
            onSuccess: (res: any) => {
                toast.success(res?.data?.message || "Cập nhật playlist thành công");
                onCancel(); // Đóng modal
            },
            onError: (err: any) => {
                const msg = err?.response?.data?.message || "Cập nhật playlist thất bại";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };

    return (
        <Modal
            open={open}
            onCancel={() => {
                // Giữ lại giá trị cũ nếu người dùng hủy
                onCancel(); 
            }}
            footer={null}
            title={`Cập nhật Playlist: ${currentPlaylist?.name || ''}`}
            centered
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                // Không cần initialValues cố định vì đã dùng useEffect/setFieldsValue
                onFinish={handleFinish}
            >
                {/* NAME */}
                <Form.Item
                    label="Tên playlist"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên playlist" },
                        { min: 3, message: "Tên playlist tối thiểu 3 ký tự" },
                    ]}
                >
                    <Input placeholder="Nhập tên playlist..." />
                </Form.Item>

                {/* DESCRIPTION */}
                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <TextArea
                        rows={3}
                        placeholder="Mô tả playlist (không bắt buộc)"
                    />
                </Form.Item>

                {/* STATUS */}
                <Form.Item label="Quyền riêng tư">
                    <Form.Item
                        name="status"
                        valuePropName="checked"
                        noStyle
                    >
                        <Switch
                            checkedChildren="Công khai"
                            unCheckedChildren="Riêng tư"
                        />
                    </Form.Item>

                    <div className="text-text-secondary text-sm mt-1">
                        Bật để mọi người có thể xem playlist của bạn
                    </div>
                </Form.Item>

                {/* ACTION */}
                <Form.Item className="text-right mt-6">
                    <Button onClick={onCancel} className="mr-2">
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        className="bg-green"
                    >
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}