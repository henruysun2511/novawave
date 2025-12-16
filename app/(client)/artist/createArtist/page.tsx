"use client";

import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
import { useSubmitVerification } from "@/queries/useArtistQuery";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Upload } from "antd";


export default function CreateArtistPage() {
    const [form] = Form.useForm();
    const toast = useToast();
    const { mutate, isPending } = useSubmitVerification();
    const { uploadFile } = useUploadFile();

    const handleSubmit = async (values: any) => {
        const frontFile: File | undefined =
            values.frontImage?.[0]?.originFileObj;
        const backFile: File | undefined =
            values.backImage?.[0]?.originFileObj;

        if (!frontFile || !backFile) {
            toast.error("Thiếu ảnh định danh");
            return;
        }

        const [{ url: frontUrl }, { url: backUrl }] = await Promise.all([
            uploadFile(frontFile),
            uploadFile(backFile),
        ]);

        const payload = {
            fullName: values.fullName,
            stageName: values.stageName,
            bio: values.bio || "",
            socialLinks: values.socialLinks || {},
            identityImages: {
                front: frontUrl,
                back: backUrl,
            },
        };

        mutate(payload, {
            onSuccess: (res) => {
                toast.success(
                    res?.data?.message || "Hồ sơ đã được gửi thành công"
                );
                form.resetFields();
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message || "Gửi hồ sơ thất bại"
                );
            },
        });
    };

    return (
        <>
            <div className="relative w-full h-[450px] mb-10">
                <img
                    src="https://wallpapercave.com/wp/wp7496876.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Đăng ký hồ sơ nghệ sĩ ngay
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Lan tỏa bài hát của bạn
                    </h3>
                </div>
            </div>

            <div className="py-6">
                <div className="flex justify-center">
                    <Card
                        className="w-full max-w-[600px] mx-auto bg-[var(--background-secondary)] rounded-2xl border border-[#333] shadow-lg p-8"
                    >
                        <h1 className="text-text-primary mb-8 text-3xl font-extrabold text-center">
                            ĐĂNG KÝ HỒ SƠ NGHỆ SĨ
                        </h1>

                        <Form layout="vertical" form={form} onFinish={handleSubmit}>
                            <Form.Item
                                name="fullName"
                                label={<span className="text-white text-base">Họ và tên</span>}
                                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="stageName"
                                label={<span className="text-white text-base">Nghệ danh</span>}
                                rules={[{ required: true, message: "Vui lòng nhập nghệ danh" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item name="bio" label={<span className="text-white text-base">Giới thiệu</span>}>
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Viết một chút về bản thân..."
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                {['facebook', 'instagram', 'tiktok', 'youtube'].map((platform) => (
                                    <Col key={platform} span={12} className="mb-4">
                                        <Form.Item
                                            name={['socialLinks', platform]}
                                            label={<span className="text-white text-base">{platform.charAt(0).toUpperCase() + platform.slice(1) + " URL"}</span>}
                                            rules={[{ type: 'url', message: 'Không phải là URL hợp lệ' }]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder={`https://www.${platform}.com/...`}
                                            />
                                        </Form.Item>
                                    </Col>
                                ))}
                            </Row>

                            <Form.Item
                                name="frontImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.fileList}
                                rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                                label={<span className="text-white text-base">Ảnh định danh (Mặt trước)</span>}
                            >
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    className="rounded-lg"
                                >
                                    <div className="flex flex-col items-center justify-center text-white">
                                        <PlusOutlined className="text-2xl" />
                                        <span className="mt-2 text-sm">Tải ảnh lên</span>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                name="backImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.fileList}
                                rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                                label={<span className="text-white text-base">Ảnh định danh (Mặt sau)</span>}
                            >
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    className="rounded-lg"
                                >
                                    <div className="flex flex-col items-center justify-center text-white">
                                        <PlusOutlined className="text-2xl" />
                                        <span className="mt-2 text-sm">Tải ảnh lên</span>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <div className="text-center mt-6">
                                <Button
                                    htmlType="submit"
                                    loading={isPending}
                                    type="primary"
                                    className="bg-green text-white font-bold rounded-lg px-6 py-3 hover:bg-green/90 transition"
                                >
                                    Gửi hồ sơ
                                </Button>
                            </div>
                        </Form>
                    </Card>

                </div>


            </div>
        </>
    );
}