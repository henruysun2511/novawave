"use client";
import { getBgColor } from "@/libs/getRandomColor";
import { Playlist } from "@/types/object.type";

interface PlaylistImageProps {
  playlist: Playlist;
  className?: string; // Để tùy chỉnh kích thước (w-40, h-40...) từ bên ngoài
}

export default function PlaylistImage({ playlist, className = "w-[180px] h-[180px]" }: PlaylistImageProps) {
  const imgs = playlist.songImages || [];
  const count = imgs.length;


  const bgColor = getBgColor(playlist._id);
  const baseStyle = `${className} object-cover rounded-xl flex items-center justify-center overflow-hidden relative ${bgColor}`;

  // 1. Nếu playlist có ảnh đại diện riêng
  if (playlist.img) {
    return (
      <img
        className={baseStyle}
        src={playlist.img}
        alt={playlist.name}
      />
    );
  }

  // 2. Nếu không có bài hát nào (Hiện chữ cái đầu)
  if (count === 0) {
    return (
      <div className={baseStyle}>
        <span className="text-white text-4xl font-bold uppercase">
          {playlist?.name?.charAt(0) || "P"}
        </span>
      </div>
    );
  }

  // 3. Nếu có 1 bài hát
  if (count === 1) {
    return (
      <img className={baseStyle} src={imgs[0]} alt="" />
    );
  }

  // 4. Nếu có 2 bài hát (Layout 2 ảnh tròn)
  if (count === 2) {
    return (
      <div className={baseStyle}>
        <img
          className="w-[50%] h-[50%] rounded-full absolute top-1/2 left-[25%] transform -translate-y-1/2 -translate-x-1/2 border-2 border-black/20"
          src={imgs[0]}
          alt=""
        />
        <img
          className="w-[50%] h-[50%] rounded-full absolute top-1/2 left-[75%] transform -translate-y-1/2 -translate-x-1/2 border-2 border-black/20"
          src={imgs[1]}
          alt=""
        />
      </div>
    );
  }

  // 5. Nếu có từ 3 bài hát trở lên
  return (
    <div className={baseStyle}>
      <img
        className="w-[40%] h-[40%] rounded-full absolute top-[15%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 border-2 border-black/10"
        src={imgs[0]}
        alt=""
      />
      <img
        className="w-[50%] h-[50%] rounded-full absolute top-[50%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 border-2 border-black/10"
        src={imgs[1]}
        alt=""
      />
      <img
        className="w-[60%] h-[60%] rounded-full absolute top-[70%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 border-2 border-black/10"
        src={imgs[2]}
        alt=""
      />
    </div>
  );
}