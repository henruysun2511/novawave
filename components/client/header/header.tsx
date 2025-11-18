"use client";
import { Input } from 'antd';
import Image from "next/image";
const { Search } = Input;

export default function Header() {
    return (
        <>
            <div className="flex items-center justify-between py-2">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={180}
                    height={180}
                />
                <Search placeholder="Tìm kiếm nhạc, nghệ sĩ, playlist,..." allowClear style={{ width: 550 }} />
                <div>Hello</div>
            </div>
        </>
    )
}