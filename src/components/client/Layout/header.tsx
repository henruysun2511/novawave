"use client";
import { useIsMobile } from '@/hooks/useIsMobile';
import { useToast } from '@/hooks/useToast';
import { useGetUserInfoQuery, useLogoutMutation } from '@/queries/useAuthQuery';
import { useSettings } from '@/queries/useSettingQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { Role } from '@/types/constant.type';
import { CrownOutlined, LogoutOutlined, MenuOutlined, SearchOutlined, ShoppingCartOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Dropdown, Input, MenuProps, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Notification from '../Notification/notification-dropdown';
import SideBar from './sidebar';
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
                {/* Mobile Header: Giảm z-index xuống để Drawer có thể đè lên nếu cần, hoặc giữ nguyên nhưng Drawer phải cao hơn */}
                <div className="flex items-center justify-between py-3 px-4 bg-black/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-[1000]">
                    <img src={logoUrl} alt="Logo" className='h-8 w-auto cursor-pointer' onClick={() => router.push("/")} />
                    <div className="flex items-center gap-4">
                        <SearchOutlined className="text-white/80 text-xl" onClick={() => setSearchOpen(true)} />
                        <Notification />
                        <MenuOutlined className="text-white text-xl" onClick={() => setMenuOpen(true)} />
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <Drawer
                    placement="right"
                    onClose={() => setMenuOpen(false)}
                    open={menuOpen}
                    width="85%"
                    closable={false}
                    zIndex={2000} // Đảm bảo cao hơn Header (1000)
                    styles={{ body: { padding: 0, background: '#000' } }}
                >
                    <div className="flex flex-col h-full">
                        {/* 1. User Profile & Quick Actions */}
                        <div className="p-6 bg-custom-gradient border-b border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar size={54} src={avatar} icon={<UserOutlined />} className="border-2 border-green" />
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-white font-bold text-lg truncate">{user?.username || "Khách"}</span>
                                    {isPrenium && <span className="text-yellow-500 text-xs flex items-center gap-1"><CrownOutlined /> Premium Member</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Nút Premium: Ẩn nếu đã là Premium hoặc hiện tùy logic */}
                                <Link href="/plan" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl text-xs font-bold">
                                    <CrownOutlined /> {isPrenium ? "Gói dịch vụ" : "Nâng cấp"}
                                </Link>

                                {/* Nút Giỏ hàng */}
                                <Link href="/cart" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold">
                                    <ShoppingCartOutlined /> Giỏ hàng
                                </Link>

                                {/* Nút Đăng ký nghệ sĩ: Chỉ hiện cho User thường */}
                                {isAuthenticated && roleName === Role.USER && (
                                    <Link href="/artist/createArtist" onClick={() => setMenuOpen(false)} className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-green/10 border border-green/20 text-green rounded-xl text-xs font-bold">
                                        <StarOutlined /> Trở thành Nghệ sĩ
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* 2. SideBar Content (Menu chính) */}
                        <div className="flex-1 overflow-y-auto">
                            <SideBar />
                        </div>

                        {/* 3. Bottom Logout */}
                        <div className="p-4 bg-[#0A0A0A] border-t border-white/5">
                            {isAuthenticated ? (
                                <button onClick={handleLogout} className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2">
                                    <LogoutOutlined /> Đăng xuất
                                </button>
                            ) : (
                                <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="block w-full py-3 bg-white text-black text-center rounded-xl font-bold">Đăng nhập</Link>
                            )}
                        </div>
                    </div>
                </Drawer>

                {/* Search Drawer */}
                <Drawer
                    title={<span className="text-white">Tìm kiếm</span>}
                    placement="top"
                    onClose={() => setSearchOpen(false)}
                    open={searchOpen}
                    height="auto"
                    className="dark-drawer"
                    styles={{ body: { background: '#121212' }, header: { background: '#121212', borderBottom: '1px solid #333' } }}
                >
                    <Search
                        size="large"
                        placeholder="Tìm bài hát, nghệ sĩ..."
                        allowClear
                        onSearch={handleSearch}
                        autoFocus
                    />
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