"use client";
import { useToast } from "@/libs/toast";
import { useDeleteAdvertisement, useToggleAdvertisement } from "@/queries/useAdvertisementQuery";
import { Advertisement } from "@/types/object.type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AdvertisementUpdateModal } from "./advertisement-update-modal";



interface Props {
    data: Advertisement[];
    loading?: boolean;
    pagination?: any;
}

export default function AdvertisementTable({
    data,
    loading,
    pagination,
}: Props) {
    const [edittingRecord, setEditingRecord] = useState<Advertisement | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { mutate: deleteAds } = useDeleteAdvertisement();
    const { mutate: toggleActive, isPending } = useToggleAdvertisement();

    const toast = useToast();

    const handleToggleActive = (id: string, isActived: boolean) => {
        toggleActive({ id, isActived },
            {
                onSuccess: (res) => {
                    toast.success(res.data.message); 
                },
                onError: (error: any) => {
                    const message =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Có lỗi xảy ra khi cập nhật trạng thái";

                    toast.error(
                        Array.isArray(message) ? message.join(", ") : message
                    );
                },
            }
        );
    };

    const columns: ColumnsType<Advertisement> = [
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Đối tác",
            dataIndex: "partner",
            key: "partner",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (description) =>
                description ? (
                    description
                ) : (
                    <div>Không có</div>
                ),
        },
        {
            title: "Audio",
            dataIndex: "audioUrl",
            key: "audioUrl",
            width: 220,
            render: (audioUrl) =>
                audioUrl ? (
                    <audio
                        src={audioUrl}
                        controls
                        style={{ width: 200, height: 32 }}
                    />
                ) : (
                    <div>Không có</div>
                ),
        },

        {
            title: "Banner",
            dataIndex: "bannerUrl",
            key: "bannerUrl",
            width: 120,
            align: "center",
            render: (bannerUrl) =>
                bannerUrl ? (
                    <Image
                        src={bannerUrl}
                        alt="banner"
                        width={80}
                        height={45}
                        style={{ objectFit: "cover", borderRadius: 6 }}
                        preview
                    />
                ) : (
                    <div>Không có</div>
                ),
        },
        {
            title: "Kích hoạt",
            dataIndex: "isActived",
            key: "isActived",
            align: "center",
            render: (value, record) => (
                <Switch
                    checked={value}
                    loading={isPending}
                    disabled={isPending}
                    onChange={(checked) => handleToggleActive(record._id, checked)
                    }
                />
            ),
        },
        {
            title: "Hành động",
            align: "center",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        onClick={() => { setOpenModal(true); setEditingRecord(record); }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa quảng cáo?"
                        description="Bạn có chắc chắn muốn xóa quảng cáo này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => deleteAds(record._id)}
                    >
                        <Button type="primary" className="bg-red-500" icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination}
            />

            <AdvertisementUpdateModal open={openModal} onCancel={() => setOpenModal(false)} data={edittingRecord} />
        </>
    );
}