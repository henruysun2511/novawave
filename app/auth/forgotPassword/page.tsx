"use client"
import { useToast } from "@/libs/toast";
import { useSendEmailMutation } from "@/queries/useAuthQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { SendEmailDto } from "@/types/body.type";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ForgotPasswordPage() {
    const router = useRouter();
    const { mutate, isPending } = useSendEmailMutation();
    const toast = useToast();
    const { setEmail } = useAuthStore();

    const handleSendEmail = (values: SendEmailDto) => {
        mutate(values, {
            onSuccess: () => {
                toast.success(`Đã gửi OTP đến email ${values.email}`);
                setEmail(values.email);
                setTimeout(() => {
                    router.push("/auth/verifyOtp");
                }, 1000);
            },

            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Gửi email thất bại");
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
                        onFinish={handleSendEmail}
                        autoComplete="off"
                        className="space-y-2"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không đúng định dạng!' }
                            ]}
                        >
                            <Input
                                placeholder="Nhập email..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>


                        <Button
                            className="w-full h-11 bg-green hover:bg-green/90 font-semibold rounded-xl"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            {isPending ? "Đang tiến hành gửi OTP đến email của bạn" : "Gửi OTP"}
                        </Button>
                    </Form>

                </div>
            </div>

        </>
    )
}
