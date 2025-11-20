"use client";
import { BellFilled } from '@ant-design/icons';
import { Input } from 'antd';
import Image from "next/image";
import "./header.css";
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
                <Search className="custom-search" size='large' placeholder="Tìm kiếm nhạc, nghệ sĩ, playlist,..." allowClear style={{ width: 550 }} />
                <div className='flex items-center gap-4 pr-4'>
                    <div className='base-button'>Khám phá prenium</div>
                    <BellFilled className='text-green text-2xl'/>
                    <img className='rounded-full w-[35px] h-[35px]' src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/474706273_1271716880797661_4801183024841724185_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFSblpoxfyBV7JMYgNkxGyZ9csM9-LqhDr1ywz34uqEOoYOuUn4cX_nasu2MfZDzeQbnXH-MCeFz-oHjxy-1oFf&_nc_ohc=yb_xnh3l4mcQ7kNvwHF3DB9&_nc_oc=AdlWXQTifE1JFQhFknoDjkUqeuMbWMF5VbiFtWk4tQHr_-BEnMYxzZH2QgwTWFPdhtiQex_RpQsFPAVH4wH7gLRG&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=9bCdBzLEadq8J1-kW2D0eg&oh=00_AfjVaW_DrBsYwZz9IWuTQ5EXMBTl6F8h2zw4ne2tL55GFg&oe=6924CF5F" alt="" />
                </div>
            </div>
        </>
    )
}