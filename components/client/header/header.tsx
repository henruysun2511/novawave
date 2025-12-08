"use client";
import { useAuthStore } from '@/stores/useAuthStore';
import { BellFilled } from '@ant-design/icons';
import { Dropdown, Input, MenuProps } from 'antd';
import Image from "next/image";
import Link from 'next/link';
import "./header.css";
const { Search } = Input;

export default function Header() {
    const { isAuthenticated, logout } = useAuthStore();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href={'/profile'}>Hồ sơ cá nhân</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href={''}>Đăng xuất</Link>
            ),
        },
    ];


    return (
        <>
            <div className="flex items-center justify-between py-2">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={180}
                    height={180}
                />
                <Search className="custom-search" size='large' placeholder="Tìm kiếm nhạc, nghệ sĩ, playlist,..." allowClear style={{ width: 550 }} />
                <div className='flex items-center gap-4 pr-4'>
                    <div className='base-button'>Khám phá prenium</div>
                    {isAuthenticated ? (
                        <>
                            <BellFilled className="text-green text-2xl" />
                            <Dropdown
                                menu={{ items }}
                                placement="bottomRight"
                                overlayClassName="dark-dropdown"
                            >
                                <img
                                    className="cursor-pointer rounded-full w-[35px] h-[35px]"
                                    src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/474706273_1271716880797661_4801183024841724185_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFSblpoxfyBV7JMYgNkxGyZ9csM9-LqhDr1ywz34uqEOoYOuUn4cX_nasu2MfZDzeQbnXH-MCeFz-oHjxy-1oFf&_nc_ohc=a7I7LjPINrYQ7kNvwFCT7dF&_nc_oc=Adl0nZTx8xHKZffQ9WyBH8DklItNzqp-cBRUIJK569XmopAIvJgVeW9f6dvGn8-GsnihTHdSe0FDpUPKwUH4DH2f&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=zj1_WGgGOmalnJesDqTlcQ&oh=00_AfnFJxiKA8b3UbgIBtbHT_XtT9s3YykZ7WrWmuoyY5Od8g&oe=693CC29F"
                                    alt="avatar"
                                />
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="base-button">
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="base-button border border-green text-green bg-transparent"
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}