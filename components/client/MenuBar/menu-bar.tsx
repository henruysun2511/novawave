import { AudioOutlined, BookOutlined, CoffeeOutlined, HomeOutlined, PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];

export default function MenuBar() {
    const items: MenuItem[] = [
        { key: '/', icon: <HomeOutlined />, label: <span className="text-lg font-semibold">Trang chủ</span> },
        { key: '/playlist', icon: <PlayCircleOutlined />, label: <span className="text-lg font-semibold">Playlist mới nhất</span> },
        { key: '/genre', icon: <AudioOutlined />, label: <span className="text-lg font-semibold">Khám phá thể loại</span> },
        { key: '/artist', icon: <UserOutlined />, label: <span className="text-lg font-semibold">Nghệ sĩ</span> },
        { key: '/room', icon: <CoffeeOutlined />, label: <span className="text-lg font-semibold">Phòng nhạc</span> },
        { key: '/news', icon: <BookOutlined />, label: <span className="text-lg font-semibold">Tin tức</span> },
    ];

    const router = useRouter();
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };

    return (
        <>
            <Menu
                defaultSelectedKeys={['/']}
                mode="inline"
                theme="dark"
                items={items}
                onClick={onClick}
                className='bg-transparent'
            />
        </>
    )
}