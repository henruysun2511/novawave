"use client";
import { Input } from 'antd';
const { Search } = Input;

export default function Header() {
    return (
        <>
            <div className="flex items-center justify-center py-6 bg-[#1a1a1a]">
                <div className='flex items-center gap-4 pr-4'>
                    Header
                </div>
            </div>
        </>
    )
}