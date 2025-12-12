"use client";

import Title from "@/components/ui/title";
import { CaretRightFilled, HeartFilled, PlusOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import LyricsPreview from "../lyrics-preview";
const { TextArea } = Input;

export default function SongDetailPage() {
    const lyrics = `
Em à anh đã biết là tình yêu này chẳng cần thiết
Em cần nơi bình yên chứ không phải anh kế bên
Em đừng giữ lại anh khi trái tim vụn vỡ chưa lành
Điều ban nãy anh vừa thấy là gì đây
Em đã vừa ghì hôn ai cận kề bên tai tựa đầu lên vai
Thấy em đang đắm say chắc em chẳng hay đôi mình chưa chia tay
Đôi khi tình yêu sẽ hoá nhạt nhoà khi vô tình một trong hai
Cuốn lấy sai trái đến khi vỡ lỡ cả hai huỷ hoại tương lai
Chẳng cần một ai nữa bất kể ai cũng dư thừa
Một mình đứng khóc giữa mưa nén cơn đau vào từng hơi thở
Một người mình chẳng ngưng nhớ nhưng lại quay bước giả vờ
Bảo rằng mình cũng như em hết thương cạn nhớ
Sự thật là chỉ mỗi em hết thương cạn nhớ
`;

    return (
        <>
            <div className="relative w-full h-[350px]">
                {/* <div className="absolute inset-0 
  bg-gradient-to-r 
  from-[#7f1d1d] 
  via-[#991b1b] 
  to-[#7c2d12]" /> */}

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 z-10 gap-5 flex items-center p-4">
                    <img className="w-[280px] h-[280px] rounded-xl" src="https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/9/7/f/a/97fa122b55eefd723d7b97f887ee8786.jpg" alt="" />
                    <div className="relative z-20">
                        <div className="text-base text-white mt-5 mb-3">
                            Đĩa đơn
                        </div>
                        <h3 className="uppercase text-6xl font-extrabold text-white mb-1 hover:text-green transition">
                            Hết thương cạn nhớ
                        </h3>
                        <div className="text-base text-white mb-3 font-bold">
                            Đức Phúc
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-3xl" />
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                        >
                            <HeartFilled className="mr-2" /> Yêu thích
                        </div>
                        <div
                            className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                        >
                            <PlusOutlined className="mr-2" />Thêm vào playlist
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mb-10 text-text-secondary text-base">
                        <div>
                            <CaretRightFilled className="mr-1" /> 53.6K
                        </div>
                        <div>
                            <HeartFilled className="mr-1" /> 574
                        </div>
                    </div>
                </div>

                <Title>Thông tin bài hát</Title>
                <table className="w-full text-left border-collapse text-base">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-3">STT</th>
                            <th className="py-3">Tên bài hát</th>
                            <th className="py-3">Album</th>
                            <th className="py-3">Nghệ sĩ</th>
                            <th className="py-3">Thời lượng</th>
                            <th className="py-3">Ngày phát hành</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="hover:bg-[var(--background-tertiary)] transition text-text-primary">
                            <td className="py-3">1</td>
                            <td className="py-3 flex items-center gap-4">
                                <img className="w-[50px] h-[50px] object-cover" src="https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316" alt="" />
                                <p>Seven</p>
                            </td>
                            <td className="py-3">Golden</td>
                            <td className="py-3">Đức phúc</td>
                            <td className="py-3">03:55</td>
                            <td className="py-3">23/07/2025</td>
                        </tr>
                    </tbody>
                </table>

                <div className="my-10"></div>
                <Title>Lời bài hát</Title>
                <LyricsPreview lyrics={lyrics} />

                <div className="my-10"></div>
                <Title>Bình luận</Title>
                <div className="">
                    <TextArea className="w-[100%]" size='large' placeholder="Nhập bình luận của bạn" allowClear />
                </div>

                <div>
                    <div className="flex gap-5 items-start my-8">
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src="https://img2.51gt3.com/rac/racer/202503/fe2de9975d864e38acfd9933164954a6.png?x-oss-process=style/_nowm" alt="" />
                        <div>
                            <div className="flex gap-3 items-center mb-2">
                                <div className="text-xl font-bold text-green">Hoàng tử Monaco</div>
                                <div className="text-text-secondary border boder-white rounded-sm px-2 py-0.5 font-bold cursor-pointer text-sm">00:50</div>
                                <div className="text-text-secondary text-base">3 giờ trước</div>
                            </div>
                            <div className="text-text-primary text-base">Bài này hay quá</div>
                        </div>
                    </div>
                    <div className="flex gap-5 items-start my-8">
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src="https://img2.51gt3.com/rac/racer/202503/fe2de9975d864e38acfd9933164954a6.png?x-oss-process=style/_nowm" alt="" />
                        <div>
                            <div className="flex gap-3 items-center mb-2">
                                <div className="text-xl font-bold text-green">Hoàng tử Monaco</div>
                                <div className="text-text-secondary border boder-white rounded-sm px-2 py-0.5 font-bold cursor-pointer text-sm">00:50</div>
                                <div className="text-text-secondary text-base">3 giờ trước</div>
                            </div>
                            <div className="text-text-primary text-base">Bài này hay quá, nghe xong khóc luôn</div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}