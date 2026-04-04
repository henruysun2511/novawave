import { RoomQueueItem } from "@/types/object.type";
import { RoomQueueStatusChip } from "./room-chip";
import { getUserName } from "@/app/roomDetail/[id]/room-detail-helpers";
import { ReactNode } from "react";

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
              <span className="text-xs text-white/55">Yeu cau boi {getUserName(item.requestedBy)}</span>
            </div>
          </div>
          {actions ? <div onClick={(e) => e.stopPropagation()}>{actions}</div> : null}
        </div>
      </div>
    );
  }