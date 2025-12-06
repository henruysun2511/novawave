"use client";
import { Button, DatePicker, Form, Input, Select } from "antd";
import Image from "next/image";

type FieldType = {
    username?: string;
    password?: string;
    rePassword?: string;
};

export default function RegisterPage() {
    const handleRegister = (values: FieldType) => {
        console.log('Success:', values);
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
                        {/* Username */}
                        <Form.Item<FieldType>
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
                        >
                            <Input
                                placeholder="Nhập username..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>

                        {/* Email */}
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

                        {/* Password */}
                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu..."
                                className="h-11 rounded-xl"
                            />
                        </Form.Item>

                        {/* Re Password */}
                        <Form.Item<FieldType>
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


                        {/* Date of birth */}
                        <Form.Item
                            name="birth"
                        >
                            <DatePicker placeholder="Chọn ngày sinh" className="w-full rounded-xl h-11" />
                        </Form.Item>

                        {/* Gender */}
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        >
                            <Select
                                placeholder="Chọn giới tính"
                                className="h-11"
                                options={[
                                    { value: 'Nam', label: 'Nam' },
                                    { value: 'Nữ', label: 'Nữ' },
                                    { value: 'Khác', label: 'Khác' }
                                ]}
                            />
                        </Form.Item>


                        {/* Submit */}
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
                    <div className="flex gap-3 items-center justify-center w-full p-3 rounded-xl bg-white hover:bg-gray-100 transition cursor-pointer">
                        <img
                            className="w-[22px] h-[22px]"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBW9gugHuiK0748qr9vZHrlIqdiDdfuEYVw&s"
                            alt=""
                        />
                        <p className="text-sm text-black font-semibold">Đăng ký với Google</p>
                    </div>

                    <p>Đã có tài khoản? <span className="text-green cursor-pointer">Đăng nhập</span></p>

                </div>
            </div>


        </>
    );
}