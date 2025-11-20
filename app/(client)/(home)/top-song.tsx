import { CaretRightFilled } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TopSong() {
    return (
        <>
            <Swiper
                slidesPerView={5}
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
                <SwiperSlide>
                    <div className="group">
                        <div className="relative w-auto h-[350px]  cursor-pointer">
                            <img className="w-full h-full rounded-xl object-cover" src="https://kenh14cdn.com/2019/10/5/poster-3-1570277471480449396935-1570277514198128777388.png" alt="" />

                            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                                    <CaretRightFilled className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-extrabold text-green">#1</h1>
                            <div>
                                <h3 className="text-lg font-semibold mt-2 text-text-primary">Còn gi đau hơn chữ đã từng</h3>
                                <p className="text-text-secondary">Quân ap</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="group">
                        <div className="relative w-auto h-[350px] cursor-pointer">
                            <img className="w-full h-full rounded-xl object-cover" src="https://preview.redd.it/bts-jungkook-standing-next-to-you-solo-album-golden-title-v0-lj875d76xkub1.jpg?width=640&crop=smart&auto=webp&s=5bdc14d63f863b2c6efb1cccb7f511f2e9304c01" alt="" />

                            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                                    <CaretRightFilled className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-extrabold text-green">#2</h1>
                            <div>
                                <h3 className="text-lg font-semibold mt-2 text-text-primary">Standing next to you</h3>
                                <p className="text-text-secondary">Jungkook</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="group">
                        <div className="relative w-auto h-[350px] cursor-pointer">
                            <img className="w-full h-full rounded-xl object-cover" src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/476765836_1171754874303644_1057393196545805879_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHiXQyovKGu5YELvYPaG2TgikNppap5gMSKQ2mlqnmAxMBCNe_RoKJ4BCeE6OnuPtpJbQPQcijO4iEBMW2sxpr4&_nc_ohc=zc59lvvK0PUQ7kNvwGhN3Py&_nc_oc=Adm8-u1vNaQWtUfuU4_yOmPAIJ0_ivNzHCtvyKoCjSrjmrfslO0K6KMwKR2JBZrDBWBXbJepJEAgmqVK0SxPB3w8&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=BIBYkgSN60B-a3-L5TZAcA&oh=00_AfhCt4JBZeNuZwnaCY43h6BWLZUu3ARKgzcDjIp--x3jaw&oe=6924AB24" alt="" />

                            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                                    <CaretRightFilled className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-extrabold text-green">#3</h1>
                            <div>
                                <h3 className="text-lg font-semibold mt-2 text-text-primary">Ngáo ngơ</h3>
                                <p className="text-text-secondary">HieuThuHai, Erik, Json, Atus, Orange</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                 <SwiperSlide>
                    <div className="group">
                        <div className="relative w-auto h-[350px] cursor-pointer">
                            <img className="w-full h-full rounded-xl object-cover" src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/412534819_1736582723790937_8599720359079924210_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEF7coyZSU1PSarpR62Exbr-aoVRcPA9375qhVFw8D3fhTISuIp8g0z6pU9seMP1RMWW951_0SP1s8IGe6Tp6CP&_nc_ohc=_Llp8ga_KM4Q7kNvwGBZmhO&_nc_oc=AdlnqLJ5smVgTwRw-wWxghUDmklL-aFTRs49iOVvEKTZ9-j3rRZZp19lskQXJhzBXUPnDEXs3muQ7Mre-dgnk9ZZ&_nc_zt=24&_nc_ht=scontent.fhan20-1.fna&_nc_gid=StlSzaagbhA8GYD5y1ws3g&oh=00_AfhnwAf5S0TYKC1TGoDYQ9SW9V2D8IXFOBVB9uydZbnifg&oe=6924CACF" alt="" />

                            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                                    <CaretRightFilled className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-extrabold text-green">#4</h1>
                            <div>
                                <h3 className="text-lg font-semibold mt-2 text-text-primary">Còn gi đau hơn chữ đã từng</h3>
                                <p className="text-text-secondary">Lọ vương</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                 <SwiperSlide>
                    <div className="group">
                        <div className="relative w-auto h-[350px] cursor-pointer">
                            <img className="w-full h-full rounded-xl object-cover" src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/480604370_964596985643010_3530335982301367243_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFC5X5A-t0V-9-ApniR4pEDXkS05v47_txeRLTm_jv-3CIsU82kIpkAtN-M8kU06h6aue9J_c_Il1usQ3zPxMaT&_nc_ohc=Yz3t8y_gRsgQ7kNvwFKSKXm&_nc_oc=AdmnXZ490c34NIBW5iGJX6geRB9O9MF7WlxnPR-LwDHRCr9YTsePRFxvuTsBcnJEL3VhKXvzIw-bPlnO2mS-XKYQ&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=sT5uqsoKWp8Fb5Gfn1_ABw&oh=00_AfiKv_k1-MGC97g5SFH9w2W_YpMzq6hxculA_aA5a0T_nQ&oe=69249FE6" alt="" />

                            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                                    <CaretRightFilled className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-extrabold text-green">#5</h1>
                            <div>
                                <h3 className="text-lg font-semibold mt-2 text-text-primary">Đau để trưởng thành</h3>
                                <p className="text-text-secondary">Lốp vương</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                 <SwiperSlide>
                    <div className="group">
                        <div className="relative w-auto h-[350px] cursor-pointer">
                            <img className="w-full h-full rounded-xl object-cover" src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/474706273_1271716880797661_4801183024841724185_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFSblpoxfyBV7JMYgNkxGyZ9csM9-LqhDr1ywz34uqEOoYOuUn4cX_nasu2MfZDzeQbnXH-MCeFz-oHjxy-1oFf&_nc_ohc=yb_xnh3l4mcQ7kNvwHF3DB9&_nc_oc=AdlWXQTifE1JFQhFknoDjkUqeuMbWMF5VbiFtWk4tQHr_-BEnMYxzZH2QgwTWFPdhtiQex_RpQsFPAVH4wH7gLRG&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=9bCdBzLEadq8J1-kW2D0eg&oh=00_AfjVaW_DrBsYwZz9IWuTQ5EXMBTl6F8h2zw4ne2tL55GFg&oe=6924CF5F" alt="" />

                            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition">
                                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shadow-lg">
                                    <CaretRightFilled className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-extrabold text-green">#6</h1>
                            <div>
                                <h3 className="text-lg font-semibold mt-2 text-text-primary">Cũng đành thôi</h3>
                                <p className="text-text-secondary">Lốp trưởng</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    );
}