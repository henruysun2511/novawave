"use client";

import Loading from "@/components/common/loading";
import Title from "@/components/common/title";
import { useToast } from "@/hooks/useToast";
import { useUploadFile } from "@/hooks/useUploadFIle";
import { useSettings, useUpdateSettings } from "@/queries/useSettingQuery";
import {
    DeleteOutlined,
    GlobalOutlined,
    InfoCircleOutlined,
    PictureOutlined,
    PlusOutlined,
    SaveOutlined,
    UploadOutlined
} from "@ant-design/icons";
import { Button, Card, Form, Input, Tabs, Tooltip, Upload } from "antd";
import { useEffect } from "react";

export default function AdminSettingPage() {
    const [form] = Form.useForm();
    const { data: settingsRes, isLoading } = useSettings();
    const updateSettingsMutation = useUpdateSettings();
    const { uploadFile } = useUploadFile();
    const toast = useToast();

    useEffect(() => {
        if (settingsRes?.data) {
            form.setFieldsValue(settingsRes.data);
        }
    }, [settingsRes, form]);

    const handleCustomUpload = async (file: File, fieldName: string | (string | number)[]) => {
        try {
            const res = await uploadFile(file);
            const imageUrl = res?.url || res;
            if (imageUrl) {
                form.setFieldValue(fieldName, imageUrl);
                toast.success("Tải ảnh lên thành công");
            }
        } catch (error) {
            toast.error("Lỗi khi tải ảnh");
        }
    };

    const onFinish = (values: any) => {
        updateSettingsMutation.mutate(values, {
            onSuccess: () => toast.success("Cập nhật cấu hình thành công!"),
            onError: () => toast.error("Cập nhật thất bại")
        });
    };

    if (isLoading) return <Loading />;

    const renderGeneralTab = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {/* Logo & Brand */}
            <Card
                title={<span className="text-white"><PictureOutlined className="mr-2" /> Hình ảnh thương hiệu</span>}
                className="bg-[#1F1F1F] border-gray-800 shadow-xl"
                variant="borderless"
            >
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <Form.Item label="Logo Website" name="logo">
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            className="avatar-uploader"
                            beforeUpload={(file) => { handleCustomUpload(file, "logo"); return false; }}
                        >
                            <Form.Item shouldUpdate noStyle>
                                {() => (
                                    form.getFieldValue("logo")
                                        ? <img src={form.getFieldValue("logo")} className="w-full h-full object-contain rounded-lg" alt="logo" />
                                        : <div className="text-gray-400"><PlusOutlined /><div className="mt-2 text-xs">Tải Logo</div></div>
                                )}
                            </Form.Item>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Banner trang Đăng nhập/Ký" name="authBanner" className="flex-1 w-full">
                        <Upload
                            listType="picture"
                            showUploadList={false}
                            beforeUpload={(file) => { handleCustomUpload(file, "authBanner"); return false; }}
                        >
                            <div className="group relative w-full h-32 border-2 border-dashed border-gray-700 hover:border-green-500 rounded-xl flex items-center justify-center overflow-hidden bg-[#141414] transition-all cursor-pointer">
                                <Form.Item shouldUpdate noStyle>
                                    {() => form.getFieldValue("authBanner")
                                        ? <img src={form.getFieldValue("authBanner")} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        : <div className="text-center text-gray-500 group-hover:text-green-500"><UploadOutlined className="text-xl" /><p className="text-xs mt-1">Chọn ảnh nền (16:9)</p></div>
                                    }
                                </Form.Item>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>
            </Card>

            {/* General Info */}
            <Card
                title={<span className="text-white"><GlobalOutlined className="mr-2" /> Thông tin liên hệ</span>}
                className="bg-[#1F1F1F] border-gray-800 shadow-xl"
                variant="borderless"
            >
                <Form.Item label="Tên website hiển thị" name="siteName">
                    <Input placeholder="NovaWave Music" className="bg-[#141414] border-gray-700 h-10" />
                </Form.Item>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Form.Item label="Email hệ thống" name="contactEmail">
                        <Input placeholder="contact@novawave.com" className="bg-[#141414] border-gray-700 h-10" />
                    </Form.Item>
                    <Form.Item label="Hotline" name="contactPhone">
                        <Input placeholder="0987..." className="bg-[#141414] border-gray-700 h-10" />
                    </Form.Item>
                </div>
            </Card>
        </div>
    );

    const renderBannerTab = () => (
        <div className="space-y-10 animate-fadeIn flex flex-col gap-3">
            {/* Children Banners Grid */}
            <Card
                title={<div className="flex items-center justify-between text-white"><span>Banner danh mục</span><Tooltip title="Hiển thị ở đầu các trang tương ứng"><InfoCircleOutlined className="text-xs" /></Tooltip></div>}
                className="bg-[#1F1F1F] border-gray-800"
                variant="borderless"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Nghệ sĩ", name: "artistPage" }, { label: "Playlist", name: "playlistPage" },
                        { label: "Album", name: "albumPage" }, { label: "Thể loại", name: "genrePage" },
                        { label: "Tin tức", name: "newsPage" }, { label: "Phòng", name: "roomPage" },
                        { label: "Gói cước", name: "planPage" }, { label: "Sản phẩm", name: "productPage" },
                    ].map((item) => (
                        <div key={item.name} className="p-3 bg-[#141414] rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
                            <div className="text-xs font-medium text-gray-400 mb-2">{item.label}</div>
                            <Form.Item shouldUpdate noStyle>
                                {() => (
                                    <div className="w-full h-24 bg-black rounded-md mb-3 overflow-hidden flex items-center justify-center relative group">
                                        {form.getFieldValue(["childrenBanner", item.name])
                                            ? <img src={form.getFieldValue(["childrenBanner", item.name])} className="w-full h-full object-cover" />
                                            : <div className="text-[20px] text-gray-800"><PictureOutlined /></div>
                                        }
                                        <Upload
                                            showUploadList={false}
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity"
                                            beforeUpload={(f) => { handleCustomUpload(f, ["childrenBanner", item.name]); return false; }}
                                        >
                                            <Button size="small" icon={<UploadOutlined />}>Đổi ảnh</Button>
                                        </Upload>
                                    </div>
                                )}
                            </Form.Item>
                            <Form.Item name={["childrenBanner", item.name]} noStyle>
                                <Input placeholder="URL ảnh" size="small" className="bg-transparent border-gray-700 text-[10px]" />
                            </Form.Item>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Main Carousel Banners */}
           <Card
                title={<div className="text-white flex items-center gap-2"><span>Slideshow Trang chủ</span></div>}
                className="bg-[#1F1F1F] border-gray-800 shadow-lg"
                variant="borderless"
            >
                <Form.List name="mainBanner">
                    {(fields, { add, remove }) => (
                        <div className="space-y-4">
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="p-5 border border-gray-800 rounded-xl bg-[#141414] relative group">
                                    <Button
                                        type="text"
                                        danger
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => remove(name)}
                                        icon={<DeleteOutlined />}
                                    />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <Form.Item shouldUpdate noStyle>
                                            {() => (
                                                <div className="w-full lg:w-48 h-32 bg-black rounded-lg overflow-hidden border border-gray-800">
                                                    {form.getFieldValue(["mainBanner", name, "imageUrl"]) ?
                                                        <img src={form.getFieldValue(["mainBanner", name, "imageUrl"])} className="w-full h-full object-cover" /> :
                                                        <div className="w-full h-full flex items-center justify-center text-gray-700"><PictureOutlined className="text-3xl" /></div>
                                                    }
                                                </div>
                                            )}
                                        </Form.Item>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                            <Form.Item {...restField} name={[name, "imageUrl"]} rules={[{ required: true }]} label="Đường dẫn ảnh">
                                                <Input suffix={<Upload showUploadList={false} beforeUpload={(f) => { handleCustomUpload(f, ["mainBanner", name, "imageUrl"]); return false; }}><UploadOutlined className="cursor-pointer hover:text-green-500" /></Upload>} />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, "title"]} label="Tiêu đề Slide">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, "redirectLink"]} label="Link khi click">
                                                <Input placeholder="https://..." />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, "description"]} label="Mô tả phụ">
                                                <Input />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="h-12 border-gray-700 text-gray-400 hover:text-green-500">Thêm Slide mới</Button>
                        </div>
                    )}
                </Form.List>
            </Card>

            <Card
                title={<div className="text-white flex items-center gap-2"><span>Mini Banners</span></div>}
                className="bg-[#1F1F1F] border-gray-800 shadow-lg"
                variant="borderless"
            >
                <Form.List name="miniBanner">
                    {(fields, { add, remove }) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="p-3 border border-gray-800 rounded-xl bg-[#141414] flex gap-4 items-center group relative hover:border-gray-600 transition-all">
                                    <Form.Item shouldUpdate noStyle>
                                        {() => (
                                            <div className="w-70 h-20 bg-black rounded-lg overflow-hidden shrink-0 border border-gray-800 relative group/img">
                                                {form.getFieldValue(["miniBanner", name, "imageUrl"]) ?
                                                    <img src={form.getFieldValue(["miniBanner", name, "imageUrl"])} className="w-full h-full object-cover" /> :
                                                    <div className="w-full h-full flex items-center justify-center text-gray-800"><PictureOutlined /></div>
                                                }
                                                <Upload
                                                    showUploadList={false}
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 bg-black/60 transition-opacity"
                                                    beforeUpload={(f) => { handleCustomUpload(f, ["miniBanner", name, "imageUrl"]); return false; }}
                                                >
                                                    <UploadOutlined className="text-white cursor-pointer" />
                                                </Upload>
                                            </div>
                                        )}
                                    </Form.Item>
                                    <div className="flex-1 space-y-2">
                                        <Form.Item {...restField} name={[name, "imageUrl"]} noStyle>
                                            <Input placeholder="URL hình ảnh" size="small" className="text-[11px]" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "redirectLink"]} noStyle>
                                            <Input placeholder="Link điều hướng" size="small" className="text-[11px]" prefix={<GlobalOutlined className="text-gray-600" />} />
                                        </Form.Item>
                                    </div>
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => remove(name)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                className="md:col-span-2 h-16 border-gray-700 text-gray-500 hover:text-green-500 hover:border-green-500 transition-all"
                            >
                                Thêm Mini Banner mới
                            </Button>
                        </div>
                    )}
                </Form.List>
            </Card>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto p-4 md:p-8 pb-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <Title>Cấu hình hệ thống</Title>
                </div>
                <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    size="large"
                    className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 border-none"
                    onClick={() => form.submit()}
                    loading={updateSettingsMutation.isPending}
                >
                    Lưu tất cả thay đổi
                </Button>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Tabs
                    defaultActiveKey="1"
                    className="custom-room-tabs"
                    items={[
                        { key: "1", label: "Thông tin chung", children: renderGeneralTab() },
                        { key: "2", label: "Quản lý Banner", children: renderBannerTab() },
                        {
                            key: "3",
                            label: "Khác",
                            children: (
                                <Card className="bg-[#1F1F1F] border-gray-800 text-center py-10" variant="borderless">
                                    <div className="text-gray-500 italic">Các cấu hình bổ sung sẽ được cập nhật sau...</div>
                                </Card>
                            )
                        },
                    ]}
                />
            </Form>

            <style jsx global>{`
                .ant-form-item-label label { color: #a3a3a3 !important; font-size: 13px !important; }
                .ant-input { background-color: #141414 !important; border-color: #303030 !important; color: white !important; }
                .ant-input:hover, .ant-input:focus { border-color: #25A26A !important; }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}