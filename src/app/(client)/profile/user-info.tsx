"use client";

import { User } from "@/types/object.type";
import { MailOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Skeleton } from "antd"; // Thêm Skeleton từ antd
import dayjs from "dayjs";
import { useState } from "react";
import UserInfoUpdateModal from "./user-info-update-modal";

interface UserInfoProps {
    user?: User;
    isPending: boolean;
}

export default function UserInfo({ user, isPending }: UserInfoProps) {
    const [open, setOpen] = useState(false);

    // --- HIỂN THỊ SKELETON KHI ĐANG TẢI ---
    if (isPending) {
        return (
            <div className="p-8 flex justify-center">
                <Card
                    className="w-full max-w-3xl bg-[var(--background-tertiary)] shadow-xl rounded-2xl border border-[#1e293b]"
                    bodyStyle={{ padding: "32px" }}
                >
                    {/* Skeleton cho tiêu đề */}
                    <Skeleton.Input active size="large" style={{ width: 200, marginBottom: 24 }} />
                    
                    {/* Skeleton cho các dòng thông tin */}
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex flex-col gap-2">
                                <Skeleton.Input active size="small" style={{ width: 100 }} />
                                <Skeleton.Input active size="default" style={{ width: '100%' }} />
                            </div>
                        ))}
                    </div>

                    {/* Skeleton cho nút bấm */}
                    <Skeleton.Button active size="large" style={{ width: 150, marginTop: 32 }} />
                </Card>
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
            <div className="p-8 flex justify-center">
                <Card
                    className="w-full max-w-3xl bg-[var(--background-tertiary)] text-white shadow-xl rounded-2xl border border-[#1e293b]"
                    bodyStyle={{ padding: "32px" }}
                >
                    <Descriptions
                        title={<p className="text-xl text-white">Thông tin cá nhân</p>}
                        column={1}
                        labelStyle={{ color: "#94a3b8", fontWeight: 500 }}
                        contentStyle={{ color: "white" }}
                    >
                        <Descriptions.Item label="Email">
                            <MailOutlined className="mr-2" />
                            {user?.email}
                        </Descriptions.Item>

                        <Descriptions.Item label="Giới tính">
                            {user?.gender === "male" ? (
                                <>
                                    <ManOutlined className="mr-2" />
                                    Nam
                                </>
                            ) : (
                                <>
                                    <WomanOutlined className="mr-2" />
                                    Nữ
                                </>
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Ngày sinh">
                            {dayjs(user?.birthday).format("DD/MM/YYYY")}
                        </Descriptions.Item>

                        <Descriptions.Item label="Trạng thái">
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    user?.status === "active"
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                }`}
                            >
                                {user?.status}
                            </span>
                        </Descriptions.Item>

                        <Descriptions.Item label="Premium">
                            {user?.isPremium ? (
                                <span className="text-yellow-400 font-semibold">Đã nâng cấp</span>
                            ) : (
                                <span className="text-gray-400">Chưa nâng cấp</span>
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Ngày tạo tài khoản">
                            {dayjs(user?.createdAt).format("DD/MM/YYYY HH:mm")}
                        </Descriptions.Item>

                        <Descriptions.Item label="Cập nhật lần cuối">
                            {dayjs(user?.updatedAt).format("DD/MM/YYYY HH:mm")}
                        </Descriptions.Item>
                    </Descriptions>

                    <Button 
                        onClick={() => setOpen(true)} 
                        type="primary" 
                        className="bg-green mt-8 h-10 px-6 font-medium border-none hover:opacity-90"
                    >
                        Cập nhật thông tin
                    </Button>
                </Card>
            </div>

            <UserInfoUpdateModal
                open={open}
                onCancel={() => setOpen(false)}
                data={user}
            />
        </>
    );
}