import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-[var(--background-tertiary)] mt-16 text-white px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Cột 1: Logo + Thông tin */}
                <div className="flex flex-col gap-4">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="rounded-lg"
                    />
                    <p className="text-sm text-gray-300">
                        Nghe nhạc chất lượng cao miễn phí cùng Novawave
                    </p>
                    <div className="flex items-center gap-2 text-gray-300">
                        <MailOutlined className="text-green"/>
                        <span className="text-sm">huysun2511@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <PhoneOutlined className="text-green"/>
                        <span className="text-sm">0362832880</span>
                    </div>
                </div>

                {/* Cột 2: Về Novawave */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg mb-2">Về Novawave</h3>
                    <ul className="flex flex-col gap-1 text-gray-300 text-sm">
                        <li className="hover:text-green cursor-pointer">Về chúng tôi</li>
                        <li className="hover:text-green cursor-pointer">Chính sách bảo mật</li>
                        <li className="hover:text-green cursor-pointer">Chính sách khách hàng</li>
                        <li className="hover:text-green cursor-pointer">Điều khoản sử dụng</li>
                    </ul>
                </div>

                {/* Cột 3: Gói Novawave */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg mb-2">Các gói của Novawave</h3>
                    <ul className="flex flex-col gap-1 text-gray-300 text-sm">
                        <li className="hover:text-green cursor-pointer">Novawave Student Premium</li>
                        <li className="hover:text-green cursor-pointer">Novawave Individual Premium</li>
                        <li className="hover:text-green cursor-pointer">Novawave Free</li>
                    </ul>
                </div>

                {/* Cột 4: Cộng đồng */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg mb-2">Cộng đồng</h3>
                    <ul className="flex flex-col gap-1 text-gray-300 text-sm">
                        <li className="hover:text-green cursor-pointer">Nghệ sĩ</li>
                        <li className="hover:text-green cursor-pointer">Nhà đầu tư</li>
                        <li className="hover:text-green cursor-pointer">Nhà quảng cáo</li>
                    </ul>
                    <div className="flex gap-2 mt-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="icon1" className="w-6 h-6 cursor-pointer" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5zQ42vVBoRGGYD7A6pKnIIRAT_G-cFVZbA&s" alt="icon2" className="w-6 h-6 cursor-pointer" />
                        <img src="https://img.freepik.com/vector-cao-cap/logo-tik-tok_578229-290.jpg?semt=ais_hybrid&w=740&q=80" alt="icon3" className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>

            </div>

            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
                © Novawave, 2025. Created by Nhat Huy.
            </div>
        </div>

    )

}