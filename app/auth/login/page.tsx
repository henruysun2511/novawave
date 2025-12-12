"use client";

import { useToast } from "@/libs/toast";
import { useLoginMutation } from "@/queries/useAuthQuery";
import { LoginDto } from "@/types/body.type";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { mutate, isPending } = useLoginMutation();
    const toast = useToast();
    const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

    const handleLogin = (values: LoginDto) => {
        mutate(values, {
            onSuccess: () => {
                toast.success("Đăng nhập thành công");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            },
            onError: (error) => {
                const err = error as any;
                toast.error(err?.response?.data?.message);
            }
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = `${baseURL}/auth/google`;
    }

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
                        onFinish={handleLogin}
                        autoComplete="off"
                        className="space-y-2"
                    >
                        <Form.Item<LoginDto>

                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
                        >
                            <Input
                                placeholder="Nhập username..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item<LoginDto>

                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>
                        <div className="text-right">
                            <Link
                                href="/auth/forgotPassword"
                                className="text-red-500 text-sm"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Button
                            className="w-full h-11 bg-green hover:bg-green/90 font-semibold rounded-xl"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            {isPending ? "Đang tiến hành đăng nhập" : "Đăng nhập"}
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6 w-full">
                        <div className="h-[1px] flex-1 bg-gray-300/30" />
                        <p className="text-sm text-gray-400">Hoặc</p>
                        <div className="h-[1px] flex-1 bg-gray-300/30" />
                    </div>

                    {/* Google login */}
                    <div onClick={handleGoogleLogin} className="flex gap-3 items-center justify-center w-full p-3 rounded-xl bg-white hover:bg-gray-100 transition cursor-pointer">
                        <img
                            className="w-[22px] h-[22px]"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBW9gugHuiK0748qr9vZHrlIqdiDdfuEYVw&s"
                            alt=""
                        />
                        <p className="text-sm text-black font-semibold">Đăng nhập với Google</p>
                    </div>

                    <p className="text-text-primary">Chưa có tài khoản? <span className="text-green cursor-pointer">
                        <Link href={'/auth/register'}>Đăng ký</Link></span></p>

                </div>
            </div>


        </>
    );
}