"use client";
import { BookOutlined, CalendarOutlined, FormatPainterOutlined, HomeOutlined, PlayCircleOutlined, ProductOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
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
            key: '2', icon: <UserOutlined />, label: <span className="text-lg font-semibold">Tài khoản</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Tổng quan</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý tài khoản</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý quyền hạn</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý vai trò</span>
                }
            ]
        },
        {
            key: '3', icon: <PlayCircleOutlined />, label: <span className="text-lg font-semibold">Âm nhạc</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Tổng quan</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý nghệ sĩ</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý bài hát</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý thể loại</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý playlist</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý album</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý phòng nhạc</span>
                }
            ]
        },
        {
            key: '4', icon: <CalendarOutlined />, label: <span className="text-lg font-semibold">Sự kiện</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Tổng quan</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý sự kiện</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý thể loại vé</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý hóa đơn vé</span>
                }
            ]
        },
        {
            key: '5', icon: <BookOutlined />, label: <span className="text-lg font-semibold">Bài viết</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Tổng quan</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý bài viết</span>
                }
            ]
        },
        {
            key: '6', icon: <FormatPainterOutlined />, label: <span className="text-lg font-semibold">Quảng cáo</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Tổng quan</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý quảng cáo</span>
                }
            ]
        },
        {
            key: '7', icon: <ProductOutlined />, label: <span className="text-lg font-semibold">Sản phẩm</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Tổng quan</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý sản phẩm</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý thể loại sản phẩm</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Quản lý đơn hàng</span>
                }
            ]
        },
        {
            key: '8', icon: <SettingOutlined />, label: <span className="text-lg font-semibold">Cài đặt chung</span>, children: [
                {
                    key: '/admin/profile', label: <span className="text-lg font-semibold">Giao diện website</span>
                },
                {
                    key: '/admin/account', label: <span className="text-lg font-semibold">Tài khoản của tôi</span>
                }
            ]
        }
    ];

    const router = useRouter();
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };

    return (
        <>
            <div
                style={{ width: "100%", background: "var(--background-secondary)" }}
                className="h-screen pt-3 px-0.5 flex flex-col"
            >
                <div>
                    <Image
                        src="/images/logo2.png"
                        alt="Logo"
                        width={150}
                        height={130}
                        className="rounded-2xl text-center mx-auto mb-2"
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

                <Button className="mt-auto mb-4 mx-2 bg-red-500 hover:!bg-red-600 text-white hover:!text-white border border-none">
                    Đăng xuất
                </Button>
            </div>
        </>
    );
}