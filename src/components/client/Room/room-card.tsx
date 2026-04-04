"use client";

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

export function RoomCard({
  room,
  action,
  note,
}: {
  room: Room;
  action?: ReactNode;
  note?: ReactNode;
}) {
  const router = useRouter();
  const isStreaming = room.status === RoomStatus.STREAMING;
  const hostName = getHostName(room.hostId);
  const hostAvatar = getHostAvatar(room.hostId);

  return (
    <div
      onClick={() => router.push(`/roomDetail/${room._id}`)}
      className={`
        group relative flex h-full flex-col cursor-pointer overflow-hidden rounded-[28px]
        border backdrop-blur-xl transition-all duration-500
        
        ${
          isStreaming
            ? "border-rose-400/30 bg-gradient-to-br from-rose-500/10 via-black/40 to-black shadow-[0_0_40px_rgba(244,63,94,0.25)]"
            : "border-white/10 bg-gradient-to-br from-[#0f0f0f] via-[#121212] to-black hover:border-emerald-400/40"
        }

        hover:shadow-[0_10px_50px_rgba(0,0,0,0.6)] hover:-translate-y-2
      `}
    >
      {/* Glow mềm khi LIVE */}
      {isStreaming && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-rose-500/20 via-transparent to-rose-500/20 blur-xl opacity-60 animate-pulse" />
        </div>
      )}

      {/* MEDIA */}
      <div className="relative z-10 aspect-video w-full overflow-hidden">
        <img
          src={room.imageUrl || "/default-room.jpg"}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* overlay cinematic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* vignette hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* BADGES */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {isStreaming ? (
            <div className="flex items-center gap-1.5 rounded-full bg-rose-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </div>
          ) : (
            <RoomStatusChip status={room.status} />
          )}

          <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-md border border-white/10">
            <UserOutlined className={isStreaming ? "text-rose-400" : "text-emerald-400"} />
            {room.participantCount || 0}
          </div>
        </div>

        {/* PLAY BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div
            className={`
              flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl 
              transform scale-90 group-hover:scale-100 transition-all duration-300
              ${
                isStreaming
                  ? "bg-rose-500 shadow-rose-900/50"
                  : "bg-emerald-500 shadow-emerald-900/50"
              }
            `}
          >
            <PlayCircleFilled style={{ fontSize: "26px" }} />
          </div>
        </div>

        {/* MINI EQUALIZER khi LIVE */}
        {isStreaming && (
          <div className="absolute bottom-3 right-3 flex gap-[2px] items-end">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-rose-400 animate-pulse"
                style={{
                  height: `${8 + i * 3}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className={`
                truncate text-lg font-bold tracking-tight transition-all duration-300
                ${
                  isStreaming
                    ? "text-rose-100 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                    : "text-white group-hover:text-emerald-300"
                }
              `}
            >
              {room.name}
            </h3>

            <p className="mt-1 line-clamp-1 text-[11px] text-white/40 italic tracking-wide">
              {room.description || "Giai điệu kết nối mọi người"}
            </p>
          </div>

          {action && (
            <div onClick={(e) => e.stopPropagation()} className="shrink-0 scale-90">
              {action}
            </div>
          )}
        </div>

        {/* INFO GRID */}
        <div
          className={`mt-4 grid grid-cols-2 gap-2 border-t pt-4 ${
            isStreaming ? "border-rose-500/10" : "border-white/5"
          }`}
        >
          <div className="min-w-0">
            <span className="block text-[9px] uppercase tracking-wider text-white/30 font-bold">
              Nguồn
            </span>
            <span
              className={`block truncate text-[11px] font-semibold uppercase ${
                isStreaming ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {room.sourceType}
            </span>
          </div>

          <div className="min-w-0">
            <span className="block text-[9px] uppercase tracking-wider text-white/30 font-bold">
              Lịch phát
            </span>
            <span className="block truncate text-[11px] font-semibold text-white/70">
              {formatTime(room.scheduledAt || room.startedAt)}
            </span>
          </div>
        </div>

        {/* NOTE */}
        {note && (
          <div
            className={`mt-3 rounded-lg px-3 py-2 text-[10px] border transition-colors ${
              isStreaming
                ? "bg-rose-500/5 text-rose-200/60 border-rose-500/10"
                : "bg-emerald-500/5 text-emerald-200/60 border-emerald-500/10"
            }`}
          >
            {note}
          </div>
        )}

        {/* HOST */}
        <div className="mt-auto pt-4 flex items-center gap-2">
          <Avatar
            size={26}
            src={hostAvatar}
            className="border border-white/20 shadow-md"
          >
            {hostName[0]}
          </Avatar>

          <span className="truncate text-[11px] text-white/60">
            Hosted by <span className="text-white font-semibold">@{hostName}</span>
          </span>
        </div>
      </div>
    </div>
  );
}