"use client";
import { useToast } from "@/libs/toast";
import { useRegisterMutation } from "@/queries/useAuthQuery";
import { Gender } from "@/types/constant.type";
import { Button, DatePicker, Form, Input, Select } from "antd";
import type { Dayjs } from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    birthday: Dayjs;
    gender: Gender;
}

export default function RegisterPage() {
    const router = useRouter();
    const { mutate, isPending } = useRegisterMutation();
    const toast = useToast();
    const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

    const handleRegister = (values: RegisterFormValues) => {
        const payload = {
            username: values.username,
            email: values.email,
            password: values.password,
            gender: values.gender,
            birthday: values.birthday.format("YYYY-MM-DD"),
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Đăng kí thành công");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            },
            onError: (error) => {
                const err = error as any;
                toast.error(err?.response?.data?.message);
            }
        });
    }

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
                        onFinish={handleRegister}
                        autoComplete="off"
                        className="space-y-2"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
                        >
                            <Input
                                placeholder="Nhập username..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>

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

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item
                            name="rePassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
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


                        <Form.Item
                            name="birthday"
                        >
                            <DatePicker placeholder="Chọn ngày sinh" className="w-full rounded-xl h-11" />
                        </Form.Item>


                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        >
                            <Select
                                placeholder="Chọn giới tính"
                                className="h-11"
                                options={[
                                    { value: Gender.MALE, label: 'Nam' },
                                    { value: Gender.FEMALE, label: 'Nữ' },
                                    { value: Gender.OTHER, label: 'Khác' }
                                ]}
                            />
                        </Form.Item>

                        <Button
                            className="w-full h-11 bg-green hover:bg-green/90 font-semibold rounded-xl"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            Đăng ký
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
                        <p className="text-sm text-black font-semibold">Đăng ký với Google</p>
                    </div>

                    <p className="text-text-primary">Đã có tài khoản? <span className="text-green cursor-pointer">
                        <Link href={"/auth/login"}> Đăng nhập</Link>
                    </span></p>

                </div>
            </div>


        </>
    );
}