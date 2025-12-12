"use client";
import Footer from "@/components/client/footer/footer";
import Title from "@/components/ui/title";
import { CaretRightFilled } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestArtistPage from "./test";

export default function ArtistDetailPage() {
    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="/images/jungkook.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        1 tỷ lượt nghe hàng tháng
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Jungkook
                    </h3>
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-10">
                    <div className="cursor-pointer w-15 h-15 rounded-full bg-green flex items-center justify-center shadow-lg">
                        <CaretRightFilled className="text-3xl" />
                    </div>
                    <div
                        className="border border-green rounded-full text-text-primary text-base px-5 py-1 cursor-pointer
                                  transition duration-200
                                 hover:bg-green hover:text-white"
                    >
                        Theo dõi
                    </div>
                </div>


                <Title>Phổ biến</Title>
                <table className="w-full text-left border-collapse text-base">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-3">STT</th>
                            <th className="py-3">Tên bài hát</th>
                            <th className="py-3">Album</th>
                            <th className="py-3">Lượt nghe</th>
                            <th className="py-3">Thời lượng</th>
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
                            <td className="py-3">2.648.769.215</td>
                            <td className="py-3">03:55</td>
                        </tr>
                        <tr className="hover:bg-[var(--background-tertiary)] transition text-text-primary">
                            <td className="py-3">2</td>
                            <td className="py-3 flex items-center gap-4">
                                <img className="w-[50px] h-[50px] object-cover" src="https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316" alt="" />
                                <p>Standing next to you</p>
                            </td>
                            <td className="py-3">Golden</td>
                            <td className="py-3">2.648.769.215</td>
                            <td className="py-3">03:55</td>
                        </tr>
                        <tr className="hover:bg-[var(--background-tertiary)] transition text-text-primary">
                            <td className="py-3">3</td>
                            <td className="py-3 flex items-center gap-4">
                                <img className="w-[50px] h-[50px] object-cover" src="https://i.scdn.co/image/ab67616d00001e02409a2d7bd4b2238e4aaa7bf5" alt="" />
                                <p>3D</p>
                            </td>
                            <td className="py-3">3D</td>
                            <td className="py-3">2.648.769.215</td>
                            <td className="py-3">03:55</td>
                        </tr>
                        <tr className="hover:bg-[var(--background-tertiary)] transition text-text-primary">
                            <td className="py-3">4</td>
                            <td className="py-3 flex items-center gap-4">
                                <img className="w-[50px] h-[50px] object-cover" src="https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316" alt="" />
                                <p>Yes or no</p>
                            </td>
                            <td className="py-3">Golden</td>
                            <td className="py-3">2.648.769.215</td>
                            <td className="py-3">03:55</td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-10 mb-5">
                    <Title>Giới thiệu</Title>
                </div>
                <div className="flex gap-5 justify-between items-center">
                    <div>
                        <div className="mb-10">
                            <h3 className="text-text-primary text-3xl font-extrabold mb-1">18.736.138</h3>
                            <p className="text-text-primary">Người theo dõi</p>
                        </div>
                        <div>
                            <h3 className="text-text-primary text-3xl font-extrabold mb-1">16.240.605</h3>
                            <p className="text-text-primary">Lượt nghe hàng tháng</p>
                        </div>
                    </div>
                    <img className="w-[500px] h-[500px] rounded-2xl object-cover" src="https://i.pinimg.com/1200x/1a/2e/79/1a2e79b262222a075368180ceefd03e5.jpg" alt="" />
                    <p className="text-gray-500 text-base">Jung Kook (Jeon, Jeongguk) is a South Korean singer, songwriter, and member of 21st century pop icons, BTS. Living up to the group’s universal reputation, Jung Kook is known as an ‘all-rounder’ with his versatility in vocal, rap and performance. In addition to BTS’ group works, Jung Kook has been proving his wide spectrum of musical talent through solo works such as “Euphoria,” “My Time” and “Still With You”, and collaborative singles with global artists including Lauv and Charlie Puth. Jung Kook has continuously participated in making music including the Japanese single “Your eyes tell”, “Stay” from BE, and “Run BTS” from Proof. He also demonstrated his potential as a producer by partaking in producing music such as “Outro : Love Is Not Over” from The most beautiful moment in life pt.1, “Magic Shop” from LOVE YOURSELF 轉 ‘TEAR’ and his solo single “Still With You.” Jung Kook also participated in singing “Dreamers”, the Official Soundtrack of FIFA World Cup Qatar 2022™, which he performed at the Opening Ceremony.</p>
                </div>

                <div className="mt-15 mb-5">
                    <Title>Danh sách đĩa nhạc</Title>
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={20}
                        slidesPerGroup={1}
                        navigation
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                        pagination={{ clickable: true }}
                        speed={600}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                        <SwiperSlide><TestArtistPage /></SwiperSlide>
                    </Swiper>
                </div>

                <div className="mt-15 mb-5">
                    <Title>Album</Title>
                </div>

            </div>
        <Footer />
        </>
    );
}