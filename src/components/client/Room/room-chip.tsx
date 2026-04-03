import { queueStatusMap, roomStatusMap } from "@/libs/mapping";
import { RoomQueueItemStatus, RoomStatus } from "@/types/constant.type";

export function RoomStatusChip({ status }: { status: RoomStatus }) {
  const config = roomStatusMap[status];
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}>{config.label}</span>;
}

export function RoomQueueStatusChip({ status }: { status: RoomQueueItemStatus }) {
  const config = queueStatusMap[status];
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}>{config.label}</span>;
}