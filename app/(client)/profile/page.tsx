import { Tabs } from "antd";
import "./profile.css";

export default function ProfilePage() {
    const items = [
        {
            label: 'Thông tin chung',
            key: '1',
            children: 'Content of editable tab 1',
        },
        {
            label: 'Gói của tôi',
            key: '2',
            children: 'Content of editable tab 2',
        },
        {
            label: 'Playlist của tôi',
            key: '3',
            children: 'Content of editable tab 3',
        },
        {
            label: 'Bài hát đã thích',
            key: '4',
            children: 'Content of editable tab 3',
        },
        {
            label: 'Nghệ sĩ đang theo dõi',
            key: '5',
            children: 'Content of editable tab 3',
        },
    ];

    return (
        <>
            <div className="relative w-full h-[350px]">

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-5 flex items-center p-4">
                    <img className="w-[280px] h-[280px] rounded-full" src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/474706273_1271716880797661_4801183024841724185_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFSblpoxfyBV7JMYgNkxGyZ9csM9-LqhDr1ywz34uqEOoYOuUn4cX_nasu2MfZDzeQbnXH-MCeFz-oHjxy-1oFf&_nc_ohc=a7I7LjPINrYQ7kNvwH4hWge&_nc_oc=AdkKUB4i3ZVYcDsUbog77RAfZPlt6dNNqCH7C8gxdGXme-9gmSUSKK2Snmr5Bkkpb3w4Q9tdsc3N4hHXOjoJgK33&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=kEF-vBxac0yycUwpkcMkbQ&oh=00_AfmE1EjGVyPk9z_ukdSrbUYAUfwkH7z6_UmScgsLXvOwMA&oe=693C8A5F" alt="" />
                    <div className="relative z-20">
                        <div className="text-base text-white mt-5 mb-3">
                            Hồ sơ
                        </div>
                        <h3 className="uppercase text-8xl font-extrabold text-white mb-1 hover:text-green transition">
                            Huy Sun
                        </h3>
                    </div>
                </div>
            </div>

            <Tabs
                defaultActiveKey="1"
                size="large"
                style={{ marginBottom: 32 }}
                items={items}
                className="profile-tabs"
            />
        </>
    )
}