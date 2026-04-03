"use client";

import type { ReactNode } from "react";

import { RoomParticipantStatus } from "@/types/constant.type";
import { RoomQueueItem } from "@/types/object.type";
import { Button, Empty, Tag } from "antd";
import { useRouter } from "next/navigation";
import { RoomQueueStatusChip } from "./room-chip";

function getRequestedByName(user: { username?: string } | string | undefined | null) {
  if (!user || typeof user === "string") return "Nguoi dung";
  return user.username || "Nguoi dung";
}








export function QueueItemCard({ item, active, onClick, actions }: { item: RoomQueueItem; active?: boolean; onClick?: () => void; actions?: ReactNode }) {
  return (
    <div className={`rounded-2xl border p-3 transition ${active ? "border-emerald-400/40 bg-emerald-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`} onClick={onClick}>
      <div className="flex items-center gap-3">
        <img src={item.songId?.imageUrl} alt={item.songId?.name} className="h-14 w-14 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-white">{item.songId?.name}</div>
          <div className="truncate text-sm text-white/60">{item.songId?.artistId?.name}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <RoomQueueStatusChip status={item.status} />
            <span className="text-xs text-white/55">Yeu cau boi {getRequestedByName(item.requestedBy)}</span>
          </div>
        </div>
        {actions ? <div onClick={(e) => e.stopPropagation()}>{actions}</div> : null}
      </div>
    </div>
  );
}

export function ParticipantStatusTag({ status }: { status: RoomParticipantStatus }) {
  const color = status === RoomParticipantStatus.ACTIVE ? "green" : status === RoomParticipantStatus.KICKED ? "orange" : status === RoomParticipantStatus.BANNED ? "red" : "default";
  return <Tag color={color}>{status}</Tag>;
}

export function EmptyRoomState({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-black/10 px-6 py-10 text-center">
      <Empty description={<span className="text-white/65">{title}</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function BackToRoomsButton() {
  const router = useRouter();
  return <Button type="primary" className="bg-emerald-500" onClick={() => router.push("/room")}>Quay ve danh sach phong</Button>;
}
