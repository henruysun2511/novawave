"use client"
import {
    BookOutlined,
    CalendarOutlined,
    CoffeeOutlined,
    HomeOutlined,
    PlayCircleOutlined,
    ShopOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";

import "./sidebar.css";

export default function SideBar() {
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        { key: '/', icon: <HomeOutlined />, label: <span className="text-lg font-semibold">Trang chủ</span> },
        { key: '2', icon: <PlayCircleOutlined />, label: <span className="text-lg font-semibold">Playlist mới nhất</span> },
        { key: '3', icon: <UserOutlined />, label: <span className="text-lg font-semibold">Nghệ sĩ</span> },
        { key: '4', icon: <CoffeeOutlined />, label: <span className="text-lg font-semibold">Phòng nhạc</span> },
        { key: '5', icon: <BookOutlined />, label: <span className="text-lg font-semibold">Tin tức</span> },
        { key: '6', icon: <CalendarOutlined />, label: <span className="text-lg font-semibold">Sự kiện</span> },
        { key: '7', icon: <ShopOutlined />, label: <span className="text-lg font-semibold">Mua bán</span> },
    ];

    const router = useRouter();
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };

    return (
        <div style={{ width: "100%", background: "var(--background-secondary)" }} className='h-screen pt-3 px-0.5 rounded-2xl'>
            <Menu
                defaultSelectedKeys={['/']}
                mode="inline"
                theme="dark"
                items={items}
                onClick={onClick}
                className='bg-transparent'
            />
        </div>
    );
}