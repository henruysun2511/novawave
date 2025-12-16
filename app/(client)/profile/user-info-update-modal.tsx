import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
import { useUpdateUserInfoMutation } from "@/queries/useAuthQuery";
import { Button, DatePicker, Form, Modal, Radio, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function UserInfoUpdateModal({ open, onCancel, data }: any) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useUpdateUserInfoMutation();
    const toast = useToast();
    const { uploadFile } = useUploadFile();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                gender: data.gender,
                birthday: data.birthday ? dayjs(data.birthday) : null,
                avatar: data.avatar
                    ? [
                        {
                            uid: "-1",
                            name: "avatar",
                            status: "done",
                            url: data.avatar,
                        },
                    ]
                    : [],
            });
        }
    }, [data]);

    const handleUpdate = async (values: any) => {
        let avatarUrl: string | undefined;

        const avatarFile: File | undefined =
            values.avatar?.[0]?.originFileObj;

        if (avatarFile) {
            const res = await uploadFile(avatarFile);
            avatarUrl = res.url;
        }

        const payload = {
            gender: values.gender,
            birthday: values.birthday
                ? values.birthday.toISOString()
                : null,
            avatar: avatarUrl,
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Cập nhật thông tin thành công");
                form.resetFields();
                onCancel();
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.message || "Có lỗi xảy ra"
                );
            },
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            title={<p className="">Chỉnh sửa thông tin</p>}
            className="dark-modal"
        >
            <Form layout="vertical" form={form} onFinish={handleUpdate}>
                <Form.Item name="gender" label={<span className="">Giới tính</span>}>
                    <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="birthday" label={<span className="">Ngày sinh</span>}>
                    <DatePicker format="DD/MM/YYYY" className="w-full" />
                </Form.Item>

                <Form.Item
                    name="avatar"
                    label={<span className="">Ảnh đại diện</span>}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                >
                    <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
                        + Upload
                    </Upload>
                </Form.Item>

                <div className="text-right">
                    <Button
                        loading={isPending}
                        type="primary"
                        className="bg-green"
                        htmlType="submit"
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}