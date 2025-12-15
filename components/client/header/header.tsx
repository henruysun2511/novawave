"use client";
import { useToast } from '@/libs/toast';
import { useGetUserInfoQuery, useLogoutMutation } from '@/queries/useAuthQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { Role } from '@/types/constant.type';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Input, MenuProps, Tooltip } from 'antd';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Notification from '../Notification/notification-dropdown';
import "./header.css";
const { Search } = Input;

export default function Header() {
    const router = useRouter();
    const toast = useToast();

    //Lấy avatar
    const { data } = useGetUserInfoQuery();
    const avatar = data?.data.avatar

    //Lấy thông tin người dùng
    const { isAuthenticated, user, roleName } = useAuthStore();
    const isPrenium = user?.isPremium;
    const finalRoleName = roleName || localStorage.getItem("roleName") || "null";


    const logoutMutation = useLogoutMutation();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Đã đăng xuất");
                router.push("/");
            },
        });
    };

    const items: MenuProps["items"] = [];

    // USER
    if (finalRoleName === Role.USER) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
    }

    // ARTIST
    if (finalRoleName === Role.ARTIST) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
        items.push({
            key: "artist",
            label: <Link href="/admin/artist/profile">Trang cho nghệ sĩ</Link>,
        });
    }

    // CÁC ROLE ADMIN
    if (finalRoleName === Role.ADMIN) {
        items.push({
            key: "admin",
            label: <Link href="/admin/overview">Trang quản lý</Link>,
        });
    }

    items.push({
        key: "logout",
        label: (
            <span className="text-red-500" onClick={handleLogout}>
                Đăng xuất
            </span>
        ),
    });


    const handleSearch = (value: string) => {
        if (!value?.trim()) return;

        router.push(`/search?keyword=${encodeURIComponent(value.trim())}`);
    };



    return (
        <>
            <div className="flex items-center justify-between py-2">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={180}
                    height={180}
                />

                <Search
                    className="custom-search"
                    size="large"
                    placeholder="Tìm kiếm nhạc, nghệ sĩ, playlist,..."
                    allowClear
                    style={{ width: 550 }}
                    onSearch={handleSearch}
                />

                <div className="flex items-center gap-4 pr-4">

                    {isAuthenticated && finalRoleName === "USER" && (
                        <Link href={"/artist/createArtist"}>
                            <div className="base-button">Đăng ký nghệ sĩ</div>
                        </Link>
                    )}

                    {(!isAuthenticated || (isAuthenticated && !isPrenium)) && (
                        <Link href={"/plan"}>
                            <div className="base-button">Khám phá premium</div>
                        </Link>
                    )}


                    {isAuthenticated ? (
                        <>
                            <Notification />

                            {(finalRoleName === "USER" || finalRoleName === "ARTIST") && (
                                <Tooltip title="Giỏ hàng">
                                    <Link href="/cart">
                                        <ShoppingCartOutlined className="text-green text-2xl cursor-pointer" />
                                    </Link>
                                </Tooltip>
                            )}

                            {/* Avatar + Dropdown */}
                            <Dropdown
                                menu={{ items }}
                                placement="bottomRight"
                                overlayClassName="dark-dropdown"
                            >
                                <Avatar
                                    style={{
                                        backgroundColor: "var(--background-tertiary)",
                                        verticalAlign: "middle",
                                    }}
                                    size="large"
                                    src={avatar ? avatar : undefined}
                                >
                                    {!avatar && user?.username?.charAt(0).toUpperCase()}
                                </Avatar>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/register" className="text-text-primary">
                                Đăng ký
                            </Link>
                            <Link
                                href="/auth/login"
                                className="text-black bg-white rounded-2xl py-1.5 px-3 font-bold"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}