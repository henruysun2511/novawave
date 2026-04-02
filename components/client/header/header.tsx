"use client";
import { useIsMobile } from '@/hooks/useIsMobile';
import { useToast } from '@/hooks/useToast';
import { useGetUserInfoQuery, useLogoutMutation } from '@/queries/useAuthQuery';
import { useSettings } from '@/queries/useSettingQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { Role } from '@/types/constant.type';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Dropdown, Input, MenuProps, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Notification from '../Notification/notification-dropdown';
import "./header.css";
const { Search } = Input;

export default function Header() {
    const router = useRouter();
    const toast = useToast();
    const { isMobile } = useIsMobile();
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState("/images/logo.png");
    const { data: settingsData } = useSettings();

    // Cập nhật logo khi API load xong
    useEffect(() => {
        if (settingsData?.data?.logo) {
            setLogoUrl(settingsData.data.logo);
        }
    }, [settingsData]);

    //Lấy avatar
    const { data } = useGetUserInfoQuery();
    const avatar = data?.data.avatar

    //Lấy thông tin người dùng
    const { isAuthenticated, user, roleName } = useAuthStore();
    const isPrenium = user?.isPremium;

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
    if (roleName === Role.USER) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
    }

    // ARTIST
    if (roleName === Role.ARTIST) {
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
    if (roleName === Role.ADMIN) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
        items.push({
            key: "admin",
            label: <Link href="/admin/overview">Trang quản lý</Link>,
        });
    }

    if (roleName === Role.SUPER_ADMIN) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
        items.push({
            key: "admin",
            label: <Link href="/admin/overview">Trang quản lý</Link>,
        });
    }

    if (roleName === Role.CONTENT_MODERATOR) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
        items.push({
            key: "admin",
            label: <Link href="/admin/song">Trang quản lý</Link>,
        });
    }

    if (roleName === Role.COMMERCE_MANAGER) {
        items.push({
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        });
        items.push({
            key: "admin",
            label: <Link href="/admin/product">Trang quản lý</Link>,
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
        setSearchOpen(false);
    };

    if (isMobile) {
        return (
            <>
                <div className="flex items-center justify-between py-3 px-4 bg-black border-b border-gray-800">
                    {/* Logo */}
                    <img
                        src={logoUrl}
                        alt="Logo"
                        width={40}
                        height={40}
                        onClick={() => router.push("/")}
                        className='cursor-pointer'
                    />

                    {/* Search Icon */}
                    <Tooltip title="Tìm kiếm">
                        <SearchOutlined
                            className="text-green text-xl cursor-pointer"
                            onClick={() => setSearchOpen(true)}
                        />
                    </Tooltip>

                    {/* Menu Icon */}
                    <Tooltip title="Menu">
                        <MenuOutlined
                            className="text-text-primary text-xl cursor-pointer"
                            onClick={() => setMenuOpen(true)}
                        />
                    </Tooltip>
                </div>

                {/* Search Drawer */}
                <Drawer
                    title="Tìm kiếm"
                    placement="top"
                    onClose={() => setSearchOpen(false)}
                    open={searchOpen}
                    height="auto"
                >
                    <Search
                        size="large"
                        placeholder="Tìm kiếm nhạc, nghệ sĩ, playlist,..."
                        allowClear
                        onSearch={handleSearch}
                        autoFocus
                    />
                </Drawer>

                {/* Menu Drawer */}
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setMenuOpen(false)}
                    open={menuOpen}
                >
                    <div className="flex flex-col gap-4">
                        {isAuthenticated ? (
                            <>
                                <Notification />
                                <div className="border-t pt-4">
                                    {items.map((item: any) => (
                                        <div
                                            key={item.key}
                                            className="py-2 hover:text-green cursor-pointer"
                                            onClick={() => {
                                                if (item.key === "logout") {
                                                    handleLogout();
                                                } else if (item.key !== "logout") {
                                                    // Navigate using the href from the link child
                                                    const href = item.label?.props?.href || item.label?.props?.children?.props?.href;
                                                    if (href) {
                                                        router.push(href);
                                                    }
                                                }
                                                setMenuOpen(false);
                                            }}
                                        >
                                            {item.key === "logout" ? (
                                                <span className="text-red-500">{item.label}</span>
                                            ) : (
                                                item.label
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/register" className="text-text-primary">
                                    Đăng ký
                                </Link>
                                <Link href="/auth/login" className="text-black bg-white rounded-2xl py-1.5 px-3 font-bold text-center">
                                    Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>
                </Drawer>
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between py-2 px-4 lg:px-0">
                {/* Logo */}
                <img
                    src={logoUrl}
                    alt="Logo"
                    width={180}
                    height={180}
                    onClick={() => router.push("/")}
                    className='cursor-pointer pl-2 lg:pl-5 w-32 lg:w-48 h-auto'
                />

                {/* Search Bar - Hidden on tablet, shown on desktop */}
                <div className="hidden lg:block flex-1 ml-25 ">
                    <Search
                        className="custom-search"
                        size="large"
                        placeholder="Tìm kiếm nhạc, nghệ sĩ, playlist,..."
                        allowClear
                        style={{ width: "100%", maxWidth: 550 }}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 lg:gap-4 pr-2 lg:pr-4">

                    {isAuthenticated && roleName === Role.USER && (
                        <Link href={"/artist/createArtist"}>
                            <div className="base-button text-xs lg:text-base px-2 lg:px-4 py-1 lg:py-2">Đăng ký nghệ sĩ</div>
                        </Link>
                    )}

                    {(!isAuthenticated || (isAuthenticated && !isPrenium)) && (
                        <Link href={"/plan"}>
                            <div className="base-button text-xs lg:text-base px-2 lg:px-4 py-1 lg:py-2">Premium</div>
                        </Link>
                    )}

                    {isAuthenticated ? (
                        <>
                            <div className="hidden md:block">
                                <Notification />
                            </div>

                            {(roleName === Role.USER || roleName === Role.ARTIST) && (
                                <Tooltip title="Giỏ hàng">
                                    <Link href="/cart">
                                        <ShoppingCartOutlined className="text-green text-lg lg:text-2xl cursor-pointer" />
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
                            <Link href="/auth/register" className="text-text-primary text-xs lg:text-base">
                                Đăng ký
                            </Link>
                            <Link
                                href="/auth/login"
                                className="text-black bg-white rounded-2xl py-1 lg:py-1.5 px-2 lg:px-3 font-bold text-xs lg:text-base"
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