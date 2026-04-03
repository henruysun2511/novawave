import { HttpMethod, NotificationType, RoomQueueItemStatus, RoomStatus } from "@/types/constant.type";
import { CheckCircleFilled, GiftFilled, HeartFilled, InfoCircleFilled, UserAddOutlined } from "@ant-design/icons";

export const roomStatusMap: Record<RoomStatus, { label: string; className: string }> = {
  [RoomStatus.WAITING]: { label: "Chưa bắt đầu", className: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  [RoomStatus.STREAMING]: { label: "Đang phát", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  [RoomStatus.PAUSED]: { label: "Tạm dừng", className: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
  [RoomStatus.ENDED]: { label: "Đã kết thúc", className: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
};

export const queueStatusMap: Record<RoomQueueItemStatus, { label: string; className: string }> = {
  [RoomQueueItemStatus.PENDING]: { label: "Chờ duyệt", className: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  [RoomQueueItemStatus.APPROVED]: { label: "Đã duyệt", className: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30" },
  [RoomQueueItemStatus.REJECTED]: { label: "Từ chối", className: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
  [RoomQueueItemStatus.PLAYING]: { label: "Đang phát", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  [RoomQueueItemStatus.PLAYED]: { label: "Đã phát", className: "bg-zinc-500/15 text-zinc-300 border-zinc-400/30" },
  [RoomQueueItemStatus.REMOVED]: { label: "Đã xóa", className: "bg-zinc-500/15 text-zinc-300 border-zinc-400/30" },
};

export const NOTIFICATION_CONFIG = {
    [NotificationType.SONG_FEAT_REQUEST]: { 
        icon: UserAddOutlined, 
        color: 'text-orange-400' 
    },
    [NotificationType.SONG_PUBLISHED]: { 
        icon: CheckCircleFilled, 
        color: 'text-green-500' 
    },
    [NotificationType.GENERAL]: { 
        icon: InfoCircleFilled, 
        color: 'text-blue-400' 
    },
    [NotificationType.NEW_FOLLOW]: { 
        icon: UserAddOutlined, 
        color: 'text-purple-400' 
    },
    [NotificationType.NEW_LIKE]: { 
        icon: HeartFilled, 
        color: 'text-red-500' 
    },
    [NotificationType.NEW_SONG_RELEASE]: { 
        icon: GiftFilled, 
        color: 'text-pink-500' 
    },
};

export const METHOD_TEXT_COLORS: Record<HttpMethod, string> = {
    [HttpMethod.GET]: 'text-green-600',
    [HttpMethod.POST]: 'text-blue-600',
    [HttpMethod.PUT]: 'text-yellow-600',
    [HttpMethod.PATCH]: 'text-indigo-600',
    [HttpMethod.DELETE]: 'text-red-600',
};