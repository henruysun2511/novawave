"use client"
import { useToast } from "@/libs/toast";
import { useResetPasswordMutation } from "@/queries/useAuthQuery";
import { ResetPasswordDto } from "@/types/body.type";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const toast = useToast();
    const router = useRouter();

    const { mutate, isPending } = useResetPasswordMutation();

    const handleResetPassword = (values: ResetPasswordDto) => {
        const payload = { newPassword: values.newPassword };

        mutate(payload, {
            onSuccess: (res) => {
                toast.success(res.message);
                router.push("/auth/login");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Reset mật khẩu thất bại");
            },
        });
    };

    return (
        <>
            <div className="flex w-screen h-screen justify-center items-center bg-[var(--background-primary)]">
                <div className="bg-black p-10 w-full max-w-md flex flex-col items-center gap-4 rounded-3xl shadow-2xl">

                    {/* Logo */}
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={180}
                        height={180}
                        className="mb-5"
                    />

                    {/* Form */}
                    <Form
                        name="basic"
                        layout="vertical"
                        style={{ width: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={handleResetPassword}
                        autoComplete="off"
                        className="space-y-2"
                    >
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
                            name="rePassword"
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
                            className="w-full h-11 bg-green hover:bg-green/90 font-semibold rounded-xl"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            {isPending ? "Đang cập nhật mật khẩu" : "Cập nhật"}
                        </Button>
                    </Form>

                </div>
            </div>

        </>
    )
}

