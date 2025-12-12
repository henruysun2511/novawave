import { useToast } from "@/libs/toast";
import { useUpdateUserInfoMutation } from "@/queries/useAuthQuery";
import { Button, DatePicker, Form, Modal, Radio, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function UserInfoUpdateModal({ open, onCancel, data }: any) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useUpdateUserInfoMutation();
    const toast = useToast();

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

    const handleUpdate = (values: any) => {
        const formData = new FormData();

        console.log(values.birthday.toISOString())

        formData.append("gender", values.gender);
        formData.append("birthday", values.birthday.toISOString());

        const file = values.avatar?.[0];

        if (file?.originFileObj) {
            formData.append("avatar", file.originFileObj);
        }

        mutate(formData, {
            onSuccess: () => {
                toast.success("Cập nhật thông tin thành công");
                form.resetFields();
                onCancel();
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Lỗi");
            }
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