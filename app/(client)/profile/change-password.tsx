import { useToast } from "@/libs/toast";
import { useChangePasswordMutation } from "@/queries/useAuthQuery";
import { ChangePasswordDto } from "@/types/body.type";
import { Button, Card, Form, Input } from "antd";

export default function ChangePassword() {
    const [form] = Form.useForm();
    const { mutate, isPending } = useChangePasswordMutation();
    const toast = useToast();

    const onFinish = (values: ChangePasswordDto) => {
        mutate(values, {
            onSuccess: (res) => {
                toast.success(res.message || "Cập nhật mật khẩu thành công");
                form.resetFields();
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Lỗi");
            }
        });
    };

    return (
        <div className="flex justify-center mt-10">
            <Card
                className="w-[500px] bg-[var(--background-tertiary)] rounded-2xl border border-[#333]"
            >
                <h1 className="text-text-primary mb-5 text-2xl font-bold text-center">
                    Đổi mật khẩu
                </h1>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập password cũ!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu cũ..."
                            className="h-11 rounded-xl"
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu..."
                            className="h-11 rounded-xl"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'))
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập lại mật khẩu..."
                            className="h-11 rounded-xl"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={isPending}
                        className="w-full bg-green hover:!bg-green-600"
                    >
                        Đổi mật khẩu
                    </Button>
                </Form>
            </Card>
        </div>
    );
}