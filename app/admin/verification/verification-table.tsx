import { useToast } from "@/libs/toast";
import { useUpdateVerification } from "@/queries/useArtistQuery";
import { VerificationStatus } from "@/types/constant.type";
import { Verification } from "@/types/object.type";
import { Button, Image, Space, Table, Tag } from "antd";
import { useState } from "react";
import VerificationRejectModal from "./verification-reject-modal";

interface Props {
    data: Verification[];
    loading?: boolean;
    pagination?: any;
}

export function VerificationTable({ data, loading, pagination }: Props) {
    const { mutate: updateStatus } = useUpdateVerification();
    const [rejectModal, setRejectModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    const toast = useToast();

    const handleApprove = (id: string) => {
        updateStatus(
            { id, data: { status: VerificationStatus.APPROVED } },
            {
                onSuccess: (res) => {
                    toast.success(res?.data?.message || "Duyệt thành công");
                },
                onError: (error: any) => {
                    const msg =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Có lỗi xảy ra";
                    toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                },
            }
        );
    };

    const columns = [
        { title: "Username", dataIndex: ["userId", "username"] },
        { title: "Tên thật", dataIndex: "fullName" },
        { title: "Nghệ danh", dataIndex: "stageName" },
        {
            title: "Tiểu sử",
            dataIndex: "bio",
            render: (bio: string) => bio || <i>Không có</i>
        },
        {
            title: "Mạng xã hội",
            dataIndex: "socialLinks",
            render: (links: any) => {
                if (!links) return <i>Không có</i>;

                return (
                    <Space direction="vertical">
                        {links.facebook && (
                            <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        )}
                        {links.instagram && (
                            <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        )}
                        {links.tiktok && (
                            <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
                                TikTok
                            </a>
                        )}
                        {links.youtube && (
                            <a href={links.youtube} target="_blank" rel="noopener noreferrer">
                                YouTube
                            </a>
                        )}
                    </Space>
                );
            }
        },

        {
            title: "Ảnh CCCD",
            render: (r: any) => (
                <Space>
                    <Image width={60} src={r.identityImages?.front} />
                    <Image width={60} src={r.identityImages?.back} />
                </Space>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (s: string) => (
                <Tag
                    color={
                        s === "pending"
                            ? "gold"
                            : s === "approved"
                                ? "green"
                                : "red"
                    }
                >
                    {s}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            render: (r: any) => (
                <Space>
                    <Button
                        type="primary"
                        disabled={r.status !== "pending"}
                        onClick={() => handleApprove(r._id)}
                    >
                        Duyệt
                    </Button>

                    <Button
                        danger
                        disabled={r.status !== "pending"}
                        onClick={() => {
                            setSelectedRecord(r); // chọn record
                            setRejectModal(true);
                        }}
                    >
                        Từ chối
                    </Button>
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

            <VerificationRejectModal
                open={rejectModal}
                onCancel={() => {
                    setRejectModal(false);
                    setSelectedRecord(null);
                }}
                data={selectedRecord}
            />
        </>
    );
}
