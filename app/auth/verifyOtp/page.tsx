"use client"
import { useToast } from "@/libs/toast";
import { useVerifyOtpMutaion } from "@/queries/useAuthQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, Form, Input, Modal, Statistic } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./countdown.css";
const { Countdown } = Statistic;

interface OtpFormValues {
    otp: string
}

export default function VerifyOtpPage() {
    const toast = useToast();
    const router = useRouter();
    const [modal, contextHolder] = Modal.useModal();
    const { mutate, isPending } = useVerifyOtpMutaion();
    const email = useAuthStore((state) => state.email);


    const handleEndtime = () => {
        modal.confirm({
            title: "Hết thời gian",
            content: "Thời gian thao tác đã hết. Bạn sẽ được quay lại trang trước.",
            okText: "OK",
            cancelText: "Ở lại",
            onOk() {
                router.back();
            },
        });
    };

    const handleSendEmail = (values: OtpFormValues) => {
        if (!email) {
            toast.error("Email không tồn tại, vui lòng gửi lại OTP");
            router.push("/auth/forgotPassword");
            return;
        }

        const payload = {
            email: email,
            otp: values.otp
        }

        mutate(payload, {
            onSuccess: (res) => {
                toast.success(res.message);
                setTimeout(() => {
                    router.push("/auth/resetPassword");
                }, 1000);
            },

            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Gửi email thất bại");
            },
        });
    }



    return (
        <>
            {contextHolder}
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
                            label=""
                            name="otp"
                            rules={[{ required: true, message: 'Vui lòng nhập mã OTP' }]}
                        >
                            <Input.OTP
                                length={6}
                                size="large"
                            />
                        </Form.Item>
                        <Countdown
                            style={{ textAlign: 'center' }}
                            title="Thời gian còn lại"
                            value={Date.now() + 1000 * 60 * 3}
                            format="mm:ss"
                            onFinish={handleEndtime}
                            className="countdown-white"
                        />
                        <div className="mb-5"></div>


                        <Button
                            className="w-full h-11 bg-green hover:bg-green/90 font-semibold rounded-xl"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            {isPending ? "Đang xác thực OTP" : "Xác nhận"}
                        </Button>
                    </Form>

                </div>
            </div>

        </>
    )
}