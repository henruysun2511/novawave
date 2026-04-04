"use client";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Segmented, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Footer from "@/components/client/Layout/footer";
import { RoomCard } from "@/components/client/Room/room-card";
import { RoomStatusChip } from "@/components/client/Room/room-chip";
import { EmptyState } from "@/components/common/empty";
import Title from "@/components/common/title";
import { useMyRoomList, useRoomList } from "@/queries/useRoomQuery";
import { useSettings } from "@/queries/useSettingQuery";
import { RoomStatus } from "@/types/constant.type";

const roomStatusOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Đang chờ", value: RoomStatus.WAITING },
    { label: "Đang phát", value: RoomStatus.STREAMING },
    { label: "Tạm dừng", value: RoomStatus.PAUSED },
];

export default function RoomPage() {
    const router = useRouter();
    const { data: settingsData } = useSettings();
    const [bannerImage, setBannerImage] = useState("https://i.pinimg.com/1200x/default.jpg");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<RoomStatus | "all">("all");

    useEffect(() => {
        if (settingsData?.data?.childrenBanner?.roomPage) {
            setBannerImage(settingsData.data.childrenBanner.roomPage);
        }
    }, [settingsData]);

    const roomParams = useMemo(
        () => ({
            page: 1,
            size: 30,
            search: search || undefined,
            status: statusFilter === "all" ? undefined : statusFilter,
        }),
        [search, statusFilter]
    );

    const { data: roomsData, isLoading: roomsLoading } = useRoomList(roomParams);
    const { data: myRoomsData, isLoading: myRoomsLoading } = useMyRoomList();

    const rooms = roomsData?.data ?? [];
    const myRooms = myRoomsData?.data ?? [];

    return (
        <>
            <div className="relative w-full h-[300px] md:h-[450px]">
                <img
                    src={bannerImage}
                    alt="Album Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 md:p-6 w-full">
                    <div className="text-xs md:text-base text-white mb-1">
                        Tạo phòng riêng, phát playlist theo hàng đợi và nhận yêu cầu nhạc từ mọi người.
                    </div>
                    <h3 className="uppercase text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-1 hover:text-green transition line-clamp-2">
                        Phòng nghe nhạc chung
                    </h3>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Button type="primary" icon={<PlusOutlined />} className="bg-emerald-500" onClick={() => router.push("/room/createRoom")}>
                            Tạo phòng mới
                        </Button>
                        <div className="rounded-full border  bg-zinc-900/50 px-4 py-2 text-sm text-white">
                            {roomsData?.meta?.totalElements ?? 0} phòng đang mở
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-10 p-4 md:p-6">
                <section className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <Title>Phòng của tôi</Title>
                            <p className="mt-2 text-sm text-white/60">Các phòng bạn đang quản lý sẽ được ưu tiên hiển thị ở đây.</p>
                        </div>
                        {myRooms.some((room) => room.status !== RoomStatus.ENDED) ? (
                            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                                Bạn đang có phòng hoạt động
                            </div>
                        ) : null}
                    </div>

                    {myRoomsLoading ? (
                        <div className="grid gap-5 lg:grid-cols-2">
                            <Skeleton active paragraph={{ rows: 7 }} className="rounded-3xl bg-black/10 p-6" />
                            <Skeleton active paragraph={{ rows: 7 }} className="rounded-3xl bg-black/10 p-6" />
                        </div>
                    ) : myRooms.length > 0 ? (
                        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                            {myRooms.map((room) => (
                                <RoomCard
                                    key={room._id}
                                    room={room}
                                    note={
                                        <div className="flex items-center justify-between gap-3">
                                            <span>Trạng thái hiện tại</span>
                                            <RoomStatusChip status={room.status} />
                                        </div>
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="Bạn chưa tạo phòng nào."
                            action={
                                <Button type="primary" className="bg-emerald-500" onClick={() => router.push("/room/createRoom")}>
                                    Tạo phòng đầu tiên
                                </Button>
                            }
                        />
                    )}
                </section>

                <section className="space-y-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <Title>Khám phá phòng</Title>
                            <p className="mt-2 text-sm text-white/60">Tham gia các phòng đang chờ, đang phát hoặc tạm dừng.</p>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <Input
                                allowClear
                                size="large"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                prefix={<SearchOutlined className="text-white/40" />}
                                placeholder="Tìm theo tên phòng"
                                className="min-w-[260px]"
                            />
                            <Segmented
                                options={roomStatusOptions}
                                value={statusFilter}
                                onChange={(value) => setStatusFilter(value as RoomStatus | "all")}
                            />
                        </div>
                    </div>

                    {roomsLoading ? (
                        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} active paragraph={{ rows: 7 }} className="rounded-3xl bg-black/10 p-6" />
                            ))}
                        </div>
                    ) : rooms.length > 0 ? (
                        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                            {rooms.map((room) => (
                                <RoomCard key={room._id} room={room} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="Không có phòng nào khớp bộ lọc hiện tại." />
                    )}
                </section>
            </div>

            <Footer />
        </>
    );
}
