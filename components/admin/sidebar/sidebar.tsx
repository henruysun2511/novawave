"use client";
import { useToast } from "@/libs/toast";
import { useLogoutMutation } from "@/queries/useAuthQuery";
import { AudioOutlined, BookOutlined, FormatPainterOutlined, HomeOutlined, PlayCircleOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../client/sidebar/sidebar.css";

type MenuItem = Required<MenuProps>['items'][number];

export default function SideBar() {
    const items: MenuItem[] = [
        {
            key: '/admin/overview', icon: <HomeOutlined />, label: <span className="text-lg font-semibold">Tổng quan</span>
        },
        {
            key: '9', icon: <AudioOutlined />, label: <span className="text-lg font-semibold">Dành cho nghệ sĩ</span>, children: [
                {
                    key: '/admin/artist/profile', label: <span className="text-lg font-semibold">Thông tin nghệ sĩ</span>
                },
                {
                    key: '/admin/artist/song', label: <span className="text-lg font-semibold">Bài hát của tôi</span>
                },
                {
                    key: '/admin/artist/album', label: <span className="text-lg font-semibold">Album của tôi</span>
                },
            ]
        },
        {
            key: '2', icon: <UserOutlined />, label: <span className="text-lg font-semibold">Tài khoản</span>, children: [
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý tài khoản</span>
                },
                {
                    key: '/admin/permission', label: <span className="text-lg font-semibold">Quản lý quyền hạn</span>
                },
                {
                    key: '/admin/role', label: <span className="text-lg font-semibold">Quản lý vai trò</span>
                }
            ]
        },
        {
            key: '3', icon: <PlayCircleOutlined />, label: <span className="text-lg font-semibold">Âm nhạc</span>, children: [
                {
                    key: '/admin/report', label: <span className="text-lg font-semibold">Báo cáo</span>
                },
                {
                    key: '/admin/verification', label: <span className="text-lg font-semibold">Kiểm duyệt nghệ sĩ</span>
                },
                {
                    key: '/admin/song', label: <span className="text-lg font-semibold">Quản lý bài hát</span>
                },
                {
                    key: '/admin/genre', label: <span className="text-lg font-semibold">Quản lý thể loại</span>
                },
                {
                    key: '/admin/playlist', label: <span className="text-lg font-semibold">Quản lý playlist</span>
                },
                {
                    key: '/admin/room', label: <span className="text-lg font-semibold">Quản lý phòng nhạc</span>
                }
            ]
        },
        {
            key: '5', icon: <BookOutlined />, label: <span className="text-lg font-semibold">Bài viết</span>, children: [
                {
                    key: '/admin/news', label: <span className="text-lg font-semibold">Quản lý bài viết</span>
                }
            ]
        },
        {
            key: '6', icon: <FormatPainterOutlined />, label: <span className="text-lg font-semibold">Quảng cáo</span>, children: [
                {
                    key: '/admin/advertisement', label: <span className="text-lg font-semibold">Quản lý quảng cáo</span>
                }
            ]
        },
        {
            key: '7', icon: <ShoppingCartOutlined />, label: <span className="text-lg font-semibold">Mua bán</span>, children: [
                {
                    key: '/admin/product', label: <span className="text-lg font-semibold">Quản lý sản phẩm</span>
                },
            ]
        },
        {
            key: '8', icon: <SettingOutlined />, label: <span className="text-lg font-semibold">Cài đặt chung</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Giao diện website</span>
                },
                {
                    key: '/admin/myAccount', label: <span className="text-lg font-semibold">Tài khoản của tôi</span>
                }
            ]
        }
    ];

    const router = useRouter();
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };

    const logoutMutation = useLogoutMutation();
    const toast = useToast();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Đã đăng xuất");
                router.push("/");
            },
        });
    };

    return (
        <>
            <div className="h-screen flex flex-col  bg-[var(--background-secondary)]overflow-hidden">
                <div className="flex-1 overflow-y-auto scrollbar-hidden pt-3 px-1">
                    <Image
                        src="/images/logo2.png"
                        alt="Logo"
                        width={150}
                        height={130}
                        className="rounded-2xl mx-auto mb-4"
                    />

                    <Menu
                        defaultSelectedKeys={['/admin/overview']}
                        mode="inline"
                        theme="dark"
                        items={items}
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
        </>
    );
}