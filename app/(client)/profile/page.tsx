"use client";
import Footer from "@/components/client/footer/footer";
import { useGetUserInfoQuery } from "@/queries/useAuthQuery";
import { Avatar, Tabs } from "antd";
import ChangePassword from "./change-password";
import "./profile.css";
import UserFollow from "./user-follow";
import UserInfo from "./user-info";
import UserLike from "./user-like";
import UserPlaylist from "./user-playlist";

export default function ProfilePage() {
    const { data, isPending } = useGetUserInfoQuery();
    const user = data?.data;
    const avatar = data?.data.avatar

    const items = [
        {
            label: 'Thông tin chung',
            key: '1',
            children: (<UserInfo user={user} isPending={isPending}/>),
        },
        {
            label: 'Gói của tôi',
            key: '2',
            children: 'Content of editable tab 2',
        },
        {
            label: 'Playlist của tôi',
            key: '3',
            children: (<UserPlaylist />),
        },
        {
            label: 'Bài hát đã thích',
            key: '4',
            children: (<UserLike />),
        },
        {
            label: 'Nghệ sĩ đang theo dõi',
            key: '5',
            children:  (<UserFollow />),
        },
        {
            label: 'Bảo mật',
            key: '6',
            children: (<ChangePassword />),
        },
    ];



    return (
        <>
            <div className="relative w-full h-[350px]">

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-5 flex items-center p-4">
                    <Avatar className="bg-[var(--background-tertiary)] w-[280px] h-[280px] text-9xl font-bold" style={{ verticalAlign: 'middle' }} size="large"
                        src={avatar ? avatar : undefined}
                    >
                        {!avatar && user?.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="relative z-20">
                        <div className="text-base text-white mt-5 mb-3">
                            Hồ sơ
                        </div>
                        <h3 className="uppercase text-8xl font-extrabold text-white mb-1 hover:text-green transition">
                            {user?.username}
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

            <Footer />
        </>
    )
}