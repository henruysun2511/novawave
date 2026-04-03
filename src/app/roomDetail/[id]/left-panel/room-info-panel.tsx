"use client";

import { RoomQueueStatusChip } from "@/components/client/Room/room-chip";
import { EmptyRoomState, QueueItemCard } from "@/components/client/Room/room-ui";
import { formatDuration, formatTime } from "@/libs/fomat";
import { RoomControlAction, RoomQueueItemStatus, RoomStatus } from "@/types/constant.type";
import { RoomDetail, RoomQueueItem } from "@/types/object.type";
import {
  AudioOutlined,
  CaretRightOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PauseOutlined,
  PlaySquareOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Button, Empty, Tabs } from "antd";
import { getUserName } from "../room-detail-helpers";

interface RoomInfoPanelProps {
  room: RoomDetail;
  isHost: boolean;
  playbackSeconds: number;
  durationSeconds: number;
  visibleQueue: RoomQueueItem[];
  requestQueue: RoomQueueItem[];
  selectedQueueItemId: string | null;
  selectedQueueItem: RoomQueueItem | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  emitHostControl: (action: RoomControlAction, extra?: any) => void;
  setSelectedQueueItemId: (id: string) => void;
  handleResolveRequest: (id: string, status: RoomQueueItemStatus.APPROVED | RoomQueueItemStatus.REJECTED) => void;
}

export function RoomInfoPanel({
  room,
  isHost,
  playbackSeconds,
  durationSeconds,
  visibleQueue,
  requestQueue,
  selectedQueueItemId,
  selectedQueueItem,
  audioRef,
  emitHostControl,
  setSelectedQueueItemId,
  handleResolveRequest,
}: RoomInfoPanelProps) {

  const renderStatusSection = () => {
    switch (room.status) {
      case RoomStatus.WAITING:
        return (
          <div className="rounded-3xl border border-[rgba(37,162,106,0.18)] bg-[linear-gradient(135deg,rgba(37,162,106,0.18),rgba(18,18,18,0.75))] p-5 shadow-inner">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-200">Waiting room</div>
            <div className="mt-3 text-2xl font-bold">Đang chờ admin bắt đầu</div>
            <div className="mt-2 text-sm text-white/70">Lịch phát: {formatTime(room.scheduledAt || room.startedAt)}</div>
            <div className="mt-2 text-sm text-white/70">Nguồn phát: {room.sourceType}</div>
          </div>
        );
      case RoomStatus.PAUSED:
        return (
          <div className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(31,31,31,0.78)] p-5">
            <div className="text-2xl font-bold text-white">Phiên nghe nhạc đang tạm dừng</div>
            <div className="mt-2 text-sm text-white/70">Chủ phòng sẽ tiếp tục phát khi sẵn sàng.</div>
          </div>
        );
      case RoomStatus.ENDED:
        return (
          <div className="rounded-3xl border border-rose-400/20 bg-[rgba(58,20,20,0.45)] p-5">
            <div className="text-2xl font-bold">Phòng đã kết thúc</div>
            <div className="mt-2 text-sm text-white/70">Phiên nghe nhạc này đã đóng.</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header Info & Controls */}
      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Room Card */}
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(18,18,18,0.62)] shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="relative h-[300px] md:h-[360px]">
            <img src={room.imageUrl} alt={room.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="inline-flex rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(18,18,18,0.65)] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-md">
                {getUserName(room.hostId)}
              </div>
              <h1 className="mt-3 text-3xl font-black text-white">{room.name}</h1>
              <p className="mt-2 line-clamp-3 text-sm text-white/65">{room.description || "Phòng chưa có mô tả."}</p>
            </div>
          </div>
        </div>

        {/* Playback Status & Now Playing */}
        <div className="space-y-4 rounded-[32px] border border-white/10 bg-[rgba(18,18,18,0.55)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {isHost && (
              <>
                <Button
                  type="primary"
                  className="bg-emerald-500"
                  icon={room.isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
                  onClick={() => emitHostControl(room.isPlaying ? RoomControlAction.PAUSE : RoomControlAction.PLAY, { currentTime: Math.round((audioRef.current?.currentTime ?? playbackSeconds) * 1000) })}
                >
                  {room.isPlaying ? "Tạm dừng" : room.status === RoomStatus.WAITING ? "Bắt đầu" : "Tiếp tục"}
                </Button>
                <Button type="primary" icon={<StepForwardOutlined />} onClick={() => emitHostControl(RoomControlAction.NEXT)}>Bài tiếp theo</Button>
                <Button type="primary" danger className="bg-rose-500 hover:bg-rose-600 border-none" icon={<CloseOutlined />} onClick={() => emitHostControl(RoomControlAction.END)}>Kết thúc</Button>
              </>
            )}
          </div>

          {renderStatusSection()}

          {/* Now Playing Card */}
          <div className="rounded-3xl border border-white/10 bg-[rgba(31,31,31,0.76)] p-5 backdrop-blur-md">
            <div className="text-sm uppercase tracking-[0.3em] text-emerald-300">Now playing</div>
            {room.currentSong ? (
              <div className="mt-4 flex items-center gap-4">
                <img src={room.currentSong.imageUrl} alt={room.currentSong.name} className="h-20 w-20 rounded-3xl object-cover shadow-lg" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-2xl font-bold text-white">{room.currentSong.name}</div>
                  <div className="truncate text-sm text-white/60">{room.currentSong.artistId?.name}</div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                    <span>{formatDuration(playbackSeconds)}</span>
                    <div className="h-px flex-1 bg-white/10" />
                    <span>{formatDuration(durationSeconds)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <Empty description={<span className="text-white/55">Chưa có bài hát đang phát</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section (Queue & Requests) */}
      <div className="min-h-0 flex-1 px-4 pb-4 md:px-6 md:pb-6">
        <div className="flex h-full min-h-0 flex-col rounded-[32px] border border-white/10 bg-[rgba(18,18,18,0.62)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <Tabs
            className="min-h-0 flex-1 custom-room-tabs"
            items={[
              {
                key: "queue",
                label: <span className="text-white"><PlaySquareOutlined /> Danh sách bài hát</span>,
                children: (
                  <div className="max-h-[400px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {visibleQueue.length > 0 ? (
                      visibleQueue.map((item) => (
                        <QueueItemCard
                          key={item._id}
                          item={item}
                          active={selectedQueueItemId === item._id}
                          onClick={() => setSelectedQueueItemId(item._id)}
                          actions={isHost && item.status !== RoomQueueItemStatus.PLAYING ? (
                            <Button size="small" type="primary" className="bg-rose-500 hover:bg-rose-600" icon={<DeleteOutlined />} onClick={() => handleResolveRequest(item._id, RoomQueueItemStatus.REJECTED)}>Ẩn</Button>
                          ) : null}
                        />
                      ))
                    ) : <EmptyRoomState title="Hàng đợi chưa có bài hát nào." />}
                  </div>
                ),
              },
              {
                key: "requests",
                label: <span className="text-white"><AudioOutlined /> Danh sách yêu cầu</span>,
                children: (
                  <div className="max-h-[400px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {requestQueue.length > 0 ? (
                      requestQueue.map((item) => (
                        <QueueItemCard
                          key={item._id}
                          item={item}
                          active={selectedQueueItemId === item._id}
                          onClick={() => setSelectedQueueItemId(item._id)}
                          actions={isHost ? (
                            <div className="flex gap-2">
                              <Button size="small" type="primary" className="bg-emerald-500" icon={<CheckOutlined />} onClick={() => handleResolveRequest(item._id, RoomQueueItemStatus.APPROVED)} />
                              <Button size="small" danger icon={<CloseOutlined />} onClick={() => handleResolveRequest(item._id, RoomQueueItemStatus.REJECTED)} />
                            </div>
                          ) : <RoomQueueStatusChip status={item.status} />}
                        />
                      ))
                    ) : <EmptyRoomState title="Chưa có yêu cầu nào được gửi tới phòng." />}
                  </div>
                ),
              },
            ]}
          />

          {selectedQueueItem && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-emerald-400">Đang chọn</div>
              <div className="mt-1 text-lg font-semibold text-white">{selectedQueueItem.songId?.name}</div>
              <div className="text-sm text-white/55">{selectedQueueItem.songId?.artistId?.name}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}