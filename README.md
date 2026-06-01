<div align="center">

# 🎵 NOVAWAVE

### *A Modern Music Streaming Platform*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5-0170FE?style=for-the-badge&logo=antdesign)](https://ant.design/)

NovaWave là một nền tảng nghe nhạc trực tuyến (music streaming platform) được phát triển với mục tiêu cung cấp trải nghiệm thưởng thức âm nhạc toàn diện cho người dùng. Ứng dụng tích hợp đầy đủ các chức năng từ phát nhạc, quản lý thư viện cá nhân cho đến các tính năng cộng đồng như nghe nhạc cùng nhau theo thời gian thực, mua nhạc, đăng ký gói Premium và hệ thống quản trị nội dung. 


</div>

---

## 📋 Mục lục

- [✨ Tính năng](#-tính-năng)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🚀 Cài đặt & Chạy dự án](#-cài-đặt--chạy-dự-án)
- [⚙️ Biến môi trường](#️-biến-môi-trường)
- [📄 Các trang chính](#-các-trang-chính)
- [🔐 Xác thực & Phân quyền](#-xác-thực--phân-quyền)

---

## ✨ Tính năng

- 🎵 **Phát nhạc** – Trình phát nhạc đồng bộ với sóng nhạc và các component liên quan
- 💬 **Bình luận nhạc** - Bình luận bài hát
- ❤️ **Thả tim bài hát** - Thả tim bài hát
- 🎤 **Quản lý nghệ sĩ / album / thể loại** – Nghệ sĩ sau khi đăng ký sẽ được upload nhạc, album.
- 📋 **Playlist cá nhân** – Tạo, chỉnh sửa và quản lý danh sách bài hát
- 🏠 **Phòng nghe nhạc (Room)** – Nghe nhạc cùng nhau theo thời gian thực qua WebSocket
- 🔍 **Tìm kiếm** – Tìm kiếm bài hát, nghệ sĩ, album, playlist, thể loại nhanh chóng
- 🛒 **Giỏ hàng & Thanh toán** – Mua nhạc / gói Premium
- 📰 **Tin tức** – Cập nhật tin tức âm nhạc mới nhất
- 👤 **Hồ sơ cá nhân** – Quản lý thông tin tài khoản
- 🔐 **Xác thực đầy đủ** – Đăng nhập, đăng ký, quên mật khẩu, xác minh OTP
- 🛡️ **Bảng quản trị (Admin)** – Quản lý toàn bộ nền tảng

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16+ | Framework React với App Router |
| [React](https://reactjs.org/) | 19 | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Type-safe JavaScript |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Utility-first CSS framework |
| [Ant Design](https://ant.design/) | 5 | Component UI library |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2 | Global state management |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5 | Lightweight state management |
| [TanStack Query](https://tanstack.com/query) | 5 | Server state & caching |
| [Axios](https://axios-http.com/) | 1 | HTTP client |
| [Socket.IO Client](https://socket.io/) | 4 | Real-time communication |
| [WaveSurfer.js](https://wavesurfer.xyz/) | 7 | Audio waveform visualization |
| [Ant Design Charts](https://charts.ant.design/) | 2 | Data visualization |
| [TinyMCE React](https://www.tiny.cloud/) | 6 | Rich text editor |
| [Swiper](https://swiperjs.com/) | 12 | Touch slider / carousel |
| [jwt-decode](https://github.com/auth0/jwt-decode) | 4 | JWT token decoding |

---

## 📁 Cấu trúc dự án

```
novawave_fe/
├── public/                    # Static assets (images, icons, videos)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (client)/          # Layout nhóm cho client
│   │   │   ├── (home)/        # Trang chủ
│   │   │   ├── about/         # Trang giới thiệu
│   │   │   ├── album/         # Trang album
│   │   │   ├── artist/        # Trang nghệ sĩ
│   │   │   ├── cart/          # Giỏ hàng
│   │   │   ├── genre/         # Thể loại nhạc
│   │   │   ├── news/          # Tin tức
│   │   │   ├── payment/       # Thanh toán
│   │   │   ├── plan/          # Gói dịch vụ
│   │   │   ├── playlist/      # Playlist
│   │   │   ├── product/       # Sản phẩm
│   │   │   ├── profile/       # Hồ sơ cá nhân
│   │   │   ├── room/          # Phòng nghe nhạc
│   │   │   ├── search/        # Tìm kiếm
│   │   │   └── song/          # Bài hát
│   │   ├── admin/             # Bảng quản trị
│   │   ├── auth/              # Xác thực (login, register, ...)
│   │   ├── callback/          # OAuth callback
│   │   ├── roomDetail/        # Chi tiết phòng nhạc [id]
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── admin/             # Components cho admin
│   │   ├── client/            # Components cho client
│   │   ├── common/            # Components dùng chung
│   │   └── provider/          # Context / Provider components
│   ├── hooks/                 # Custom React hooks
│   ├── libs/                  # Cấu hình thư viện (axios, ...)
│   ├── queries/               # TanStack Query hooks
│   ├── services/              # API service functions
│   ├── stores/                # Zustand / Redux stores
│   ├── types/                 # TypeScript type definitions
│   └── middleware.ts          # Next.js middleware (auth guard)
├── .env                       # Biến môi trường (local)
├── next.config.ts             # Cấu hình Next.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x hoặc **yarn** >= 1.22.x

### Bước 1: Clone dự án

```bash
git clone https://github.com/henruysun2511/novawave.git
cd novawave_fe
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc (copy từ `.env.example` nếu có):

```bash
cp .env.example .env
```

Sau đó cập nhật các giá trị trong file `.env` (xem phần [Biến môi trường](#️-biến-môi-trường)).

### Bước 4: Chạy môi trường phát triển

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3001** (hoặc port khác nếu 3001 đã bị chiếm)

### Build cho Production

```bash
npm run build
npm run start
```

### Lint code

```bash
npm run lint
```

---

## ⚙️ Biến môi trường

Tạo file `.env` ở thư mục gốc dự án với nội dung sau:

```env
# URL API của backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# API Key của TinyMCE (rich text editor)
NEXT_PUBLIC_TINY_API_KEY=your_tinymce_api_key_here

# URL Socket.IO server (thường trùng với backend URL không có /api/v1)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL của REST API backend | `http://localhost:3000/api/v1` |
| `NEXT_PUBLIC_TINY_API_KEY` | API Key từ [TinyMCE Cloud](https://www.tiny.cloud/) | `abc123...` |
| `NEXT_PUBLIC_SOCKET_URL` | URL server Socket.IO cho real-time | `http://localhost:3000` |

> **Lưu ý:** Các biến có tiền tố `NEXT_PUBLIC_` sẽ được expose ra phía client. Không đặt thông tin nhạy cảm vào các biến này.

---

## 📄 Các trang chính

| Route | Mô tả | Yêu cầu đăng nhập |
|---|---|---|
| `/` | Trang chủ | ❌ |
| `/song/[id]` | Chi tiết bài hát | ❌ |
| `/album/[id]` | Chi tiết album | ❌ |
| `/artist/[id]` | Trang nghệ sĩ | ❌ |
| `/genre/[id]` | Thể loại nhạc | ❌ |
| `/playlist/[id]` | Chi tiết playlist | ❌ |
| `/search` | Tìm kiếm | ❌ |
| `/news` | Tin tức | ❌ |
| `/about` | Giới thiệu | ❌ |
| `/room` | Danh sách phòng nhạc | ✅ |
| `/roomDetail/[id]` | Phòng nghe nhạc cùng nhau | ✅ |
| `/playlist` | Playlist của tôi | ✅ |
| `/profile` | Hồ sơ cá nhân | ✅ |
| `/cart` | Giỏ hàng | ✅ |
| `/plan` | Gói dịch vụ | ✅ |
| `/payment` | Thanh toán | ✅ |
| `/admin` | Bảng quản trị | ✅ (Admin) |
| `/auth/login` | Đăng nhập | ❌ |
| `/auth/register` | Đăng ký | ❌ |
| `/auth/forgot-password` | Quên mật khẩu | ❌ |
| `/auth/verify-otp` | Xác minh OTP | ❌ |
| `/auth/reset-password` | Đặt lại mật khẩu | ❌ |

---

## 🔐 Xác thực & Phân quyền

Dự án sử dụng **JWT (JSON Web Token)** lưu trong cookie (`accessToken`) để xác thực người dùng.

### Luồng xác thực (Middleware)

```
Request đến
    │
    ├─ Trang Auth (Login/Register) + Có token hợp lệ → Redirect về "/"
    │
    ├─ Trang Public (/, /song, /album, /artist, /genre, /playlist, /search, /news, /about) → Cho qua
    │
    ├─ Không có token → Redirect về "/auth/login"
    │
    └─ Có token nhưng hết hạn → Xóa cookie + Redirect về "/auth/login"
```

### Phân quyền

- **Guest** – Xem trang chủ, duyệt nhạc, tìm kiếm, xem tin tức
- **User** – Tất cả tính năng Guest + phòng nghe nhạc, playlist, thanh toán, hồ sơ
- **Artist** – Upload file nhạc, quản lý bài hát, album
- **Admin** – Toàn quyền + truy cập bảng quản trị `/admin`

---

## 🎤 Nghe nhạc
Chức năng nghe nhạc là chức năng trọng tâm của nền tảng NovaWave, cho phép người dùng trải nghiệm âm nhạc một cách thuận tiện, liên tục và cá nhân hóa. Hệ thống hỗ trợ đầy đủ các thao tác điều khiển cơ bản như phát/tạm dừng bài hát, tua nhanh, tua lùi, chuyển sang bài hát tiếp theo hoặc quay lại bài hát trước.

Điều khiển phát nhạc

Người dùng có thể:

▶️ Phát hoặc tạm dừng bài hát.
⏩ Tua nhanh hoặc tua lùi đến vị trí mong muốn.
⏭️ Chuyển sang bài hát tiếp theo.
⏮️ Quay lại bài hát trước đó.
🔊 Điều chỉnh âm lượng phát nhạc.
Chính sách quảng cáo và Premium

Hệ thống phân biệt trải nghiệm giữa người dùng thường và người dùng Premium:

Người dùng Premium: Được nghe nhạc liên tục không giới hạn và không xuất hiện quảng cáo.
Người dùng thường: Sau mỗi ba bài hát được phát, hệ thống sẽ tự động phát một quảng cáo. Quảng cáo không cho phép tua hoặc bỏ qua nhằm đảm bảo hiệu quả quảng bá nội dung.
Các chế độ phát nhạc

NovaWave hỗ trợ nhiều chế độ phát nhạc nhằm đáp ứng các nhu cầu sử dụng khác nhau:

1. Nghe nhạc đơn

Khi người dùng mở một bài hát riêng lẻ, sau khi bài hát kết thúc, hệ thống sẽ tự động lựa chọn và phát ngẫu nhiên một bài hát khác dựa trên cơ chế đề xuất.

2. Nghe nhạc theo Album hoặc Playlist

Khi phát từ Album hoặc Playlist, các bài hát sẽ được phát tuần tự theo danh sách đã được định nghĩa sẵn. Người dùng có thể chuyển bài, phát lại hoặc thay đổi thứ tự phát tùy theo quyền được hỗ trợ.

3. Phát nhạc từ hàng đợi (Queue)

Người dùng có thể tự xây dựng danh sách hàng đợi phát nhạc. Trong chế độ này, hệ thống sẽ phát các bài hát theo đúng thứ tự trong hàng đợi và duy trì nguyên vẹn cấu trúc danh sách cho đến khi người dùng thay đổi.

Đồng bộ sóng nhạc (Waveform)

NovaWave sử dụng cơ chế đồng bộ hai chiều giữa thanh tiến trình bài hát và sóng âm thanh:

Khi người dùng kéo thanh tiến trình (Song Bar), vị trí hiển thị trên sóng nhạc sẽ được cập nhật tương ứng.
Khi người dùng tương tác trực tiếp trên sóng nhạc, thời điểm phát của bài hát cũng được thay đổi theo vị trí được chọn.

Tính năng này giúp người dùng dễ dàng xác định và di chuyển đến các đoạn mong muốn trong bài hát một cách trực quan.

Đồng bộ với Sidebar

Thông tin bài hát đang phát được cập nhật theo thời gian thực trên Sidebar của hệ thống.

Các thông tin được hiển thị bao gồm:

Ảnh bìa bài hát.
Tên bài hát.
Tên nghệ sĩ thể hiện.
Thông tin Album (nếu có).

Ngoài ra, người dùng có thể thực hiện thao tác Follow hoặc Unfollow nghệ sĩ ngay tại Sidebar mà không cần chuyển sang trang thông tin nghệ sĩ, giúp tăng tính thuận tiện trong quá trình sử dụng.

## 💬 Bình luận nhạc đồng bộ với sóng âm

## ❤️ Thả tim bài hát
## 🏠 Phòng nghe nhạc chung
## 🔍 Tìm kiếm nâng cao
## 🚀 Nghệ sĩ & Upload file nhạc
## 💳 Đăng ký prenium
## 🎵 Tạo playlist
## Cấu hình website


<div align="center">

Made by **NHAT HUY**

</div>
