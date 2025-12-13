import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { useUpdateArtistProfile } from "@/queries/useArtistQuery";
import { Artist } from "@/types/object.type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload } from "antd";
import { useEffect } from "react";

export default function ArtistProfileUpdate({ artist }: { artist: Artist }) {
    const [form] = Form.useForm();
    const toast = useToast();

    const { mutate, isPending } = useUpdateArtistProfile();

    useEffect(() => {
        if (!artist) return;

        form.setFieldsValue({
            name: artist.name,
            country: artist.country,
            biography: artist.biography,

            avatarUrl: artist.avatarUrl
                ? [
                    {
                        uid: "-1",
                        name: "avatar",
                        status: "done",
                        url: artist.avatarUrl,
                    },
                ]
                : [],

            bannerUrl: artist.bannerUrl
                ? [
                    {
                        uid: "-2",
                        name: "banner",
                        status: "done",
                        url: artist.bannerUrl,
                    },
                ]
                : [],
        });
    }, [artist, form]);


    const handleUpdateProfile = (values: any) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("country", values.country || "");
        formData.append("biography", values.biography || "");

        const avatarImg = values.avatarUrl?.[0];
        if (avatarImg?.originFileObj) {
            formData.append("avatar", avatarImg.originFileObj);
        }

        const bannerImg = values.bannerUrl?.[0];
        if (bannerImg?.originFileObj) {
            formData.append("banner", bannerImg.originFileObj);
        }

        // Gọi mutation
        mutate(formData, {
            onSuccess: (res) => {
                toast.success(res?.data?.message || "Cập nhật hồ sơ thành công!");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Cập nhật hồ sơ thất bại");
            },
        });
    };

    return (
        <>
            <Title>Cập nhật thông tin</Title>
            <div className="mb-8"></div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
            >
                <Row gutter={24}>
                    {/* LEFT SIDE */}
                    <Col span={8}>
                        <Form.Item
                            name="avatarUrl"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                            label={<span className="text-white text-base">Ảnh đại diện</span>}
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
                            name="bannerUrl"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                            label={<span className="text-white text-base">Ảnh bìa</span>}
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
                    </Col>

                    {/* RIGHT SIDE */}
                    <Col span={16}>
                        <Form.Item
                            label={<span className="text-white text-base">Nghệ danh</span>}
                            name="name"
                            rules={[{ required: true, message: "Tên bài hát không được để trống" }]}
                        >
                            <Input placeholder="Nhập tên nghệ danh..." />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-white text-base">Quốc gia</span>}
                            name="country"
                        >
                            <Input placeholder="Nhập quốc gia..." />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-white text-base">Tiểu sử</span>}
                            name="biography"
                        >
                            <Input placeholder="Nhập tiểu sử..." />
                        </Form.Item>


                        <Form.Item>
                            <div className="text-center mt-6">
                                <Button
                                    htmlType="submit"
                                    loading={isPending}
                                    type="primary"
                                    className="bg-green text-white font-bold rounded-lg px-6 py-3 hover:bg-green/90 transition"
                                >
                                    Cập nhật profile
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </>
    )
}