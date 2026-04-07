"use client";

import Footer from "@/components/client/Layout/footer";
import { useSettings } from "@/queries/useSettingQuery";
import {
  CustomerServiceOutlined,
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
  SafetyOutlined,
  SoundOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <SoundOutlined />,
    title: "Chất lượng cao",
    desc: "Nghe nhạc lossless với chất lượng lên đến 24-bit/192kHz, mang đến trải nghiệm âm thanh studio ngay trên thiết bị của bạn.",
  },
  {
    icon: <GlobalOutlined />,
    title: "Kho nhạc khổng lồ",
    desc: "Hàng triệu bài hát từ mọi thể loại, mọi quốc gia, được cập nhật liên tục mỗi ngày.",
  },
  {
    icon: <TeamOutlined />,
    title: "Phòng nghe chung",
    desc: "Tạo phòng nghe nhạc với bạn bè, chia sẻ cảm xúc qua âm nhạc theo thời gian thực.",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Gợi ý thông minh",
    desc: "Thuật toán AI phân tích gu âm nhạc, đề xuất những bài hát phù hợp nhất với bạn.",
  },
  {
    icon: <SafetyOutlined />,
    title: "An toàn & Bảo mật",
    desc: "Hệ thống bảo mật tiên tiến, bảo vệ dữ liệu cá nhân và quyền riêng tư của bạn.",
  },
  {
    icon: <HeartOutlined />,
    title: "Hỗ trợ nghệ sĩ",
    desc: "Nền tảng công bằng, minh bạch, hỗ trợ nghệ sĩ phát triển sự nghiệp âm nhạc.",
  },
];

const stats = [
  { value: "10M+", label: "Bài hát" },
  { value: "500K+", label: "Nghệ sĩ" },
  { value: "2M+", label: "Người dùng" },
  { value: "99.9%", label: "Uptime" },
];

const teamMembers = [
  {
    name: "Nhat Huy",
    role: "Founder & CEO",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=NH&backgroundColor=25A26A",
  },
  {
    name: "Minh Tuan",
    role: "CTO",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=MT&backgroundColor=1a8a5a",
  },
  {
    name: "Thu Ha",
    role: "Head of Design",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=TH&backgroundColor=2ECC71",
  },
  {
    name: "Duc Anh",
    role: "Lead Engineer",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=DA&backgroundColor=149e5a",
  },
];

export default function AboutPage() {
  const { data: settingsData } = useSettings();
  const [siteName, setSiteName] = useState("Novawave");
  const [logoUrl, setLogoUrl] = useState("/images/logo.png");

  useEffect(() => {
    if (settingsData?.data) {
      if (settingsData.data.siteName) setSiteName(settingsData.data.siteName);
      if (settingsData.data.logo) setLogoUrl(settingsData.data.logo);
    }
  }, [settingsData]);

  return (
    <>
      <div className="min-h-screen">
        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden px-6 pt-16 pb-24">
          {/* Animated background orbs */}
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[100px] animate-pulse delay-1000" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <SoundOutlined className="text-emerald-400 text-sm" />
              <span className="text-emerald-400 text-sm font-medium">
                Nền tảng nghe nhạc thế hệ mới
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Về{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {siteName}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Chúng tôi tin rằng âm nhạc có sức mạnh kết nối con người.{" "}
              {siteName} được tạo ra để mang đến trải nghiệm nghe nhạc tuyệt
              vời nhất, nơi mọi giai điệu đều trở nên sống động.
            </p>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 text-center
                           hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-500 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MISSION & VISION ===== */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <div
              className="group relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.06] p-8 md:p-10
                          hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <RocketOutlined className="text-emerald-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Sứ mệnh</h2>
                <p className="text-gray-400 leading-relaxed">
                  Mang âm nhạc chất lượng cao đến gần hơn với mọi người. Chúng
                  tôi không chỉ tạo ra một nền tảng nghe nhạc, mà còn xây dựng
                  một cộng đồng nơi nghệ sĩ và người nghe cùng nhau tạo nên
                  những trải nghiệm âm nhạc đáng nhớ.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div
              className="group relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.06] p-8 md:p-10
                          hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[60px] group-hover:bg-teal-500/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                  <TrophyOutlined className="text-teal-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Tầm nhìn</h2>
                <p className="text-gray-400 leading-relaxed">
                  Trở thành nền tảng âm nhạc số hàng đầu, nơi công nghệ và nghệ
                  thuật hòa quyện, mang đến trải nghiệm nghe nhạc cá nhân hóa,
                  đồng thời hỗ trợ nghệ sĩ phát triển sự nghiệp một cách bền
                  vững.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tại sao chọn{" "}
                <span className="text-emerald-400">{siteName}</span>?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Những tính năng vượt trội giúp bạn tận hưởng âm nhạc theo cách
                riêng của mình.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7
                             hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5
                                   text-emerald-400 text-xl group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500"
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Đội ngũ của chúng tôi
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Những con người tài năng và đam mê đứng sau {siteName}.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="group text-center rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6
                             hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all duration-500"
                >
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500" />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full border-2 border-white/10 group-hover:border-emerald-500/40 transition-all duration-500 object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-base mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,162,106,0.15) 0%, rgba(16,185,129,0.08) 50%, rgba(6,182,212,0.1) 100%)",
                border: "1px solid rgba(37,162,106,0.2)",
              }}
            >
              <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] rounded-full bg-emerald-500/10 blur-[100px]" />
              <div className="absolute bottom-[-60px] left-[-60px] w-[200px] h-[200px] rounded-full bg-teal-500/10 blur-[80px]" />

              <div className="relative z-10">
                <CustomerServiceOutlined className="text-5xl text-emerald-400 mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Sẵn sàng trải nghiệm?
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto mb-8">
                  Tham gia cùng hàng triệu người dùng đang tận hưởng âm nhạc
                  trên {siteName}. Bắt đầu miễn phí ngay hôm nay.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 text-white font-semibold
                             hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(37,162,106,0.3)] transition-all duration-300
                             active:scale-95"
                >
                  <SoundOutlined />
                  Khám phá ngay
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
