import { formatTime } from "@/libs/fomat";
import { RoomStatus } from "@/types/constant.type";
import { Room } from "@/types/object.type";
import { PlayCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { RoomStatusChip } from "./room-chip";

function getHostName(host: Room["hostId"]) {
  if (!host || typeof host === "string") return "Nguoi dung";
  return host.username || "Nguoi dung";
}

function getHostAvatar(host: Room["hostId"]) {
  if (!host || typeof host === "string") return undefined;
  return host.avatar;
}

export function RoomCard({ room, action, note }: { room: Room; action?: ReactNode; note?: ReactNode }) {
  const router = useRouter();
  const isStreaming = room.status === RoomStatus.STREAMING;
  const hostName = getHostName(room.hostId);
  const hostAvatar = getHostAvatar(room.hostId);

  return (
    <div 
      onClick={() => router.push(`/roomDetail/${room._id}`)} 
      className={`group relative flex h-full flex-col cursor-pointer overflow-hidden rounded-[24px] border transition-all duration-500 
        ${isStreaming 
          ? "border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)] bg-rose-500/[0.02]" 
          : "border-white/5 bg-[var(--background-tertiary)] hover:border-emerald-500/40"
        } 
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1`}
    >
      {/* Hiệu ứng viền chạy (Glow Animation) khi Streaming */}
      {isStreaming && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-[-1px] rounded-[24px] bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 opacity-30 blur-[2px] animate-pulse" />
        </div>
      )}

      {/* Media Box */}
      <div className="relative z-10 aspect-video w-full overflow-hidden">
        <img 
          src={room.imageUrl || "/default-room.jpg"} 
          alt={room.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {isStreaming ? (
            <div className="flex items-center gap-1.5 rounded-md bg-rose-600 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-rose-900/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Live
            </div>
          ) : (
            <RoomStatusChip status={room.status} />
          )}
          
          <div className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
            <UserOutlined className={isStreaming ? "text-rose-400" : "text-emerald-400"} />
            {room.participantCount || 0}
          </div>
        </div>

        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
           <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform ${isStreaming ? 'bg-rose-500' : 'bg-emerald-500'}`}>
              <PlayCircleFilled style={{ fontSize: '24px' }} />
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`truncate text-lg font-bold tracking-tight transition-colors ${isStreaming ? 'text-rose-50' : 'text-white group-hover:text-emerald-400'}`}>
              {room.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-[11px] text-white/40 italic">
              {room.description || "Giai điệu kết nối mọi người"}
            </p>
          </div>
          {action && (
            <div onClick={(e) => e.stopPropagation()} className="shrink-0 scale-90">
              {action}
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className={`mt-4 grid grid-cols-2 gap-2 border-t pt-4 ${isStreaming ? 'border-rose-500/10' : 'border-white/5'}`}>
          <div className="min-w-0">
            <span className="block text-[9px] uppercase tracking-wider text-white/30 font-bold">Nguồn</span>
            <span className={`block truncate text-[11px] font-semibold uppercase ${isStreaming ? 'text-rose-400' : 'text-emerald-400'}`}>
              {room.sourceType}
            </span>
          </div>
          <div className="min-w-0">
            <span className="block text-[9px] uppercase tracking-wider text-white/30 font-bold">Lịch phát</span>
            <span className="block truncate text-[11px] font-semibold text-white/70">
               {formatTime(room.scheduledAt || room.startedAt)}
            </span>
          </div>
        </div>

        {/* Note - Thiết kế lại cho đồng bộ với trạng thái Live */}
        {note && (
          <div className={`mt-3 rounded-lg px-3 py-2 text-[10px] border transition-colors ${
            isStreaming 
              ? "bg-rose-500/5 text-rose-200/60 border-rose-500/10" 
              : "bg-emerald-500/5 text-emerald-200/60 border-emerald-500/10"
          }`}>
            {note}
          </div>
        )}

        {/* Host Info */}
        <div className="mt-auto pt-4 flex items-center gap-2">
          <Avatar 
            size={24}
            src={hostAvatar}
            className={`border ${isStreaming ? 'border-rose-500/30' : 'border-white/10'}`}
          >
            {hostName[0]}
          </Avatar>
          <span className="truncate text-[11px] font-medium text-white/50">
            by <span className={`transition-colors ${isStreaming ? 'text-rose-200/80' : 'text-white/80'}`}>@{hostName}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
