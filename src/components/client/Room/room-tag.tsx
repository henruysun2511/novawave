"use client";

import type { ReactNode } from "react";

import { RoomParticipantStatus } from "@/types/constant.type";
import { RoomQueueItem } from "@/types/object.type";
import { Button, Empty, Tag } from "antd";
import { useRouter } from "next/navigation";
import { RoomQueueStatusChip } from "./room-chip";



export function ParticipantStatusTag({ status }: { status: RoomParticipantStatus }) {
  const color = status === RoomParticipantStatus.ACTIVE ? "green" : status === RoomParticipantStatus.KICKED ? "orange" : status === RoomParticipantStatus.BANNED ? "red" : "default";
  return <Tag color={color}>{status}</Tag>;
}





