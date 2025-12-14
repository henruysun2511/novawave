import { useToast } from "@/libs/toast";
import { useCreateReport } from "@/queries/useReportQuery";
import { ReportTargetType } from "@/types/constant.type";
import { Report } from "@/types/object.type";
import { Button, Form, Input, Modal, Select } from "antd";

interface Props {
    open: boolean;
    onClose: () => void;
    targetId: string;
    targetType: ReportTargetType
}

export default function ReportModal({ open, onClose, targetId, targetType }: Props) {
    const [form] = Form.useForm<Report>();
    const toast = useToast();
    
    const { mutate, isPending } = useCreateReport();

    const handleFinish = (values: Report) => {
        
        const payload = {
            targetId: targetId,
            targetType: targetType,
            reason: values.reason,
            description: values.description,
        };

        mutate(payload, {
            onSuccess: (res) => {
                toast.success(res?.data?.message || "Gửi báo cáo thành công!");
                form.resetFields();
                onClose();
            },
            onError: (err: any) => {
                const msg = err?.response?.data?.message || "Có lỗi xảy ra khi gửi báo cáo.";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={`Báo cáo ${targetType === 'album' ? 'Album' : 'Bài hát'}`}
            footer={null}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="mt-4"
            >
                <Form.Item
                    name="reason"
                    label="Lý do báo cáo"
                    rules={[{ required: true, message: "Vui lòng chọn lý do" }]}
                >
                    <Select
                        placeholder="Chọn lý do báo cáo..."
                        options={[
                            { value: 'explicit_content', label: 'Nội dung người lớn/Explicit' },
                            { value: 'copyright_violation', label: 'Vi phạm bản quyền' },
                            { value: 'hate_speech', label: 'Nội dung kích động thù địch' },
                            { value: 'other', label: 'Lý do khác' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả chi tiết (Tùy chọn)"
                >
                    <Input.TextArea rows={4} placeholder="Cung cấp thêm chi tiết về vấn đề..." />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        loading={isPending}
                        type="primary"
                        className="w-full mt-4 bg-green"
                    >
                        Gửi Báo Cáo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}