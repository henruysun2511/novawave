"use client"
import { useToast } from "@/libs/toast";
import { useUploadFile } from "@/libs/upload";
import { useUpdateAdvertisement } from "@/queries/useAdvertisementQuery";
import { Advertisement } from "@/types/object.type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

type Props = {
    open: boolean;
    onCancel: () => void;
    data?: Advertisement | null;
};

export function AdvertisementUpdateModal({
    open,
    onCancel,
    data,
}: Props) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useUpdateAdvertisement();
    const toast = useToast();
    const { uploadFile } = useUploadFile();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                audio: data.audioUrl
                    ? [
                        {
                            uid: '-1',
                            name: data.audioUrl.split('/').pop(),
                            status: 'done',
                            url: data.audioUrl,
                        },
                    ]
                    : [],

                banner: data.bannerUrl
                    ? [
                        {
                            uid: '-1',
                            name: data.bannerUrl.split('/').pop(),
                            status: 'done',
                            url: data.bannerUrl,
                        },
                    ]
                    : [],
            });
        }
    }, [data]);

    const handleUpdateAdvertisement = async (values: any) => {
        if (!data) {
            toast.error("Advertisement data is null");
            return;
        }

        try {
            let audioUrl = data.audioUrl;
            let bannerUrl = data.bannerUrl;

            // upload audio nếu có file mới
            const audioFile = values.audio?.[0]?.originFileObj;
            if (audioFile) {
                const res = await uploadFile(audioFile);
                audioUrl = res.url;
            }

            // upload banner nếu có file mới
            const bannerFile = values.banner?.[0]?.originFileObj;
            if (bannerFile) {
                const res = await uploadFile(bannerFile);
                bannerUrl = res.url;
            }

            mutate(
                {
                    id: data._id,
                    data: {
                        title: values.title,
                        description: values.description,
                        partner: values.partner,
                        audioUrl,
                        bannerUrl,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật quảng cáo thành công");
                        onCancel();
                    },
                    onError: () => toast.error("Lỗi"),
                }
            );
        } catch (err) {
            toast.error("Upload thất bại");
        }
    };



    return (
        <Modal
            open={open}
            title="Chỉnh sửa quảng cáo"
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdateAdvertisement}>
                <Form.Item
                    name="title"
                    label="Tiêu đề quảng cáo"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="partner" label="Đối tác" rules={[{ required: true, message: "Vui lòng nhập đối tác" }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <TextArea placeholder="Nhập tên đối tác..." />
                </Form.Item>

                <Form.Item
                    name="audio"
                    label="Audio"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: "Vui lòng chọn audio" }]}
                >
                    <Upload
                        accept="audio/*"
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Chọn audio</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="banner"
                    label="Ảnh bìa"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: "Vui lòng chọn ảnh bìa" }]}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        + Upload
                    </Upload>
                </Form.Item>

                <div className="text-right">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        className="bg-green"
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}