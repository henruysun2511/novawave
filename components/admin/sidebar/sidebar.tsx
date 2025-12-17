"use client";
import { useToast } from "@/libs/toast";
import { useLogoutMutation } from "@/queries/useAuthQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/types/constant.type";
import { AudioOutlined, BookOutlined, FormatPainterOutlined, HomeOutlined, PlayCircleOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../client/sidebar/sidebar.css";

type MenuItem = Required<MenuProps>['items'][number];

export default function SideBar() {
    const router = useRouter();
    const toast = useToast();
    const logoutMutation = useLogoutMutation();
    
    // Lấy thông tin role từ store
    const { roleName } = useAuthStore();
    const finalRoleName = roleName || (typeof window !== 'undefined' ? localStorage.getItem("roleName") : null);

    // 1. Định nghĩa các nhóm Menu theo chức năng
    const menuGroups = {
        overview: {
            key: '/admin/overview', 
            icon: <HomeOutlined />, 
            label: <span className="text-lg font-semibold">Tổng quan</span>
        },
        artist: {
            key: '9', icon: <AudioOutlined />, label: <span className="text-lg font-semibold">Dành cho nghệ sĩ</span>, children: [
                { key: '/admin/artist/profile', label: <span className="text-lg font-semibold">Thông tin nghệ sĩ</span> },
                { key: '/admin/artist/song', label: <span className="text-lg font-semibold">Bài hát của tôi</span> },
                { key: '/admin/artist/album', label: <span className="text-lg font-semibold">Album của tôi</span> },
            ]
        },
        accounts: {
            key: '2', icon: <UserOutlined />, label: <span className="text-lg font-semibold">Tài khoản</span>, children: [
                { key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý tài khoản</span> },
                { key: '/admin/permission', label: <span className="text-lg font-semibold">Quản lý quyền hạn</span> },
                { key: '/admin/role', label: <span className="text-lg font-semibold">Quản lý vai trò</span> }
            ]
        },
        plans: {
            key: '10', icon: <BookOutlined />, label: <span className="text-lg font-semibold">Gói nhạc</span>, children: [
                { key: '/admin/plan', label: <span className="text-lg font-semibold">Quản lý gói nghe nhạc</span> }
            ]
        },
        music: {
            key: '3', icon: <PlayCircleOutlined />, label: <span className="text-lg font-semibold">Âm nhạc</span>, children: [
                { key: '/admin/report', label: <span className="text-lg font-semibold">Báo cáo</span> },
                { key: '/admin/verification', label: <span className="text-lg font-semibold">Kiểm duyệt nghệ sĩ</span> },
                { key: '/admin/song', label: <span className="text-lg font-semibold">Quản lý bài hát</span> },
                { key: '/admin/genre', label: <span className="text-lg font-semibold">Quản lý thể loại</span> },
                { key: '/admin/playlist', label: <span className="text-lg font-semibold">Quản lý playlist</span> },
            ]
        },
        ads: {
            key: '6', icon: <FormatPainterOutlined />, label: <span className="text-lg font-semibold">Quảng cáo</span>, children: [
                { key: '/admin/advertisement', label: <span className="text-lg font-semibold">Quản lý quảng cáo</span> }
            ]
        },
        commerce: {
            key: '7', icon: <ShoppingCartOutlined />, label: <span className="text-lg font-semibold">Mua bán</span>, children: [
                { key: '/admin/product', label: <span className="text-lg font-semibold">Quản lý sản phẩm</span> },
            ]
        },
    };

    // 2. Logic phân quyền hiển thị
    const getVisibleItems = (): MenuItem[] => {
        const items: MenuItem[] = [];

        // SUPER ADMIN: Có tất cả trừ Artist
        if (finalRoleName === Role.SUPER_ADMIN) {
            return [
                menuGroups.overview,
                menuGroups.accounts,
                menuGroups.plans,
                menuGroups.music,
                menuGroups.ads,
                menuGroups.commerce
            ];
        }

        // ADMIN: Overview, Accounts, Plans, Ads, Commerce
        if (finalRoleName === Role.ADMIN) {
            items.push(menuGroups.overview, menuGroups.accounts, menuGroups.plans, menuGroups.ads, menuGroups.commerce);
        }

        // ARTIST: Chỉ menu dành cho nghệ sĩ
        if (finalRoleName === Role.ARTIST) {
            items.push(menuGroups.artist);
        }

        // CONTENT MODERATOR: Chỉ menu Âm nhạc
        if (finalRoleName === Role.CONTENT_MODERATOR) {
            items.push(menuGroups.music);
        }

        if (finalRoleName === Role.COMMERCE_MANAGER) {
            items.push(menuGroups.commerce);
        }


        return items;
    };

    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Đã đăng xuất");
                router.push("/");
            },
        });
    };

    return (
        <div className="h-screen flex flex-col bg-[var(--background-secondary)] overflow-hidden">
            <div className="flex-1 overflow-y-auto scrollbar-hidden pt-3 px-1">
                <Image
                    src="/images/logo2.png"
                    alt="Logo"
                    width={150}
                    height={130}
                    className="rounded-2xl mx-auto mb-4 cursor-pointer"
                    onClick={() => router.push("/")}
                />

                <Menu
                    defaultSelectedKeys={['/admin/overview']}
                    mode="inline"
                    theme="dark"
                    items={getVisibleItems()} // Gọi hàm lọc item theo role
                    onClick={onClick}
                    className="bg-transparent"
                />
            </div>

            <div className="p-3">
                <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:!bg-red-600 text-white border-none"
                >
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
}