import { useToast } from "@/libs/toast";
import { useCreatePlaylist } from "@/queries/usePlaylistQuery";
import { PlaylistStatus } from "@/types/constant.type";
import { Button, Form, Input, Modal, Switch } from "antd";

const { TextArea } = Input;

interface PlaylistCreateModalProps {
    open: boolean;
    onCancel: () => void;
}

export default function PlaylistCreateModal({
    open,
    onCancel,
}: PlaylistCreateModalProps) {
    const [form] = Form.useForm();
    const toast = useToast();
    const { mutate, isPending } = useCreatePlaylist();

    const handleFinish = (values: any) => {
        mutate(values, {
            onSuccess: (res: any) => {
                toast.success(res?.data?.message || "Tạo playlist thành công");
                form.resetFields();
                onCancel();
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.message || "Tạo playlist thất bại"
                );
            },
        });
    };

    return (
        <Modal
            open={open}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
            title="Tạo playlist mới"
            centered
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    handleFinish({
                        ...values,
                        status: values.status
                            ? PlaylistStatus.PUBLIC
                            : PlaylistStatus.PRIVATE,
                    });
                }}
                initialValues={{
                    status: false, 
                }}
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
                        Tạo playlist
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}