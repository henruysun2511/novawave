"use client";

import { RoomQueueItemStatus } from "@/types/constant.type";
import { RoomQueueItem } from "@/types/object.type";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Empty, Tooltip } from "antd";

// Import Swiper React components và styles
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

interface QueueSliderProps {
  visibleQueue: RoomQueueItem[];
  selectedQueueItemId: string | null;
  selectedQueueItem: RoomQueueItem | null;
  isHost: boolean;
  setSelectedQueueItemId: (id: string) => void;
  handleResolveRequest: (id: string, status: any) => void;
}

export function QueueSlider({
  visibleQueue,
  selectedQueueItemId,
  selectedQueueItem,
  isHost,
  setSelectedQueueItemId,
  handleResolveRequest,
}: QueueSliderProps) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 p-4">
      {/* Swiper Slider */}
      <div className="mb-10">
        {visibleQueue.length > 0 ? (
          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            freeMode={true}
            mousewheel={{ forceToAxis: true }}
            modules={[FreeMode, Mousewheel]}
            className="queue-swiper !pb-10 !pt-4"
          >
            {visibleQueue.map((item) => (
              <SwiperSlide key={item._id} className="!w-fit">
                <div
                  onClick={() => setSelectedQueueItemId(item._id)}
                  className={`relative w-[180px] md:w-[220px] cursor-pointer overflow-hidden rounded-[28px] border transition-all duration-500 ease-out ${
                    selectedQueueItemId === item._id
                      ? "border-emerald-500 scale-105 shadow-[0_20px_40px_rgba(16,185,129,0.25)] z-10"
                      : "border-white/5 grayscale-[0.4] opacity-80 hover:grayscale-0 hover:opacity-100 hover:border-white/20 hover:scale-[1.02]"
                  }`}
                >
                  {/* Image & Overlay */}
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={item.songId?.imageUrl}
                      className={`h-full w-full object-cover transition-transform duration-700 ${
                        selectedQueueItemId === item._id ? "scale-110" : "hover:scale-105"
                      }`}
                      alt={item.songId?.name}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Content Info */}
                  <div className="absolute bottom-0 p-4 w-full backdrop-blur-[2px]">
                    <div className="truncate text-sm font-bold text-white shadow-sm">
                      {item.songId?.name}
                    </div>
                    <div className="truncate text-xs text-white/60 font-medium">
                      {item.songId?.artistId?.name}
                    </div>
                  </div>

                  {/* Playing Indicator */}
                  {item.status === RoomQueueItemStatus.PLAYING && (
                    <div className="absolute top-3 right-3 rounded-2xl bg-emerald-500/90 px-2 py-1.5 backdrop-blur-md shadow-lg border border-white/20">
                      <div className="flex items-end gap-0.5 h-3">
                        <div className="w-0.5 bg-white animate-[music-bar_0.8s_ease-in-out_infinite]" />
                        <div className="w-0.5 bg-white animate-[music-bar_1.2s_ease-in-out_infinite]" />
                        <div className="w-0.5 bg-white animate-[music-bar_1.0s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] opacity-40">
            <Empty description={<span className="text-white/60">Hàng đợi đang trống</span>} />
          </div>
        )}
      </div>

      {/* Selected Item Detail Card */}
      {selectedQueueItem && (
        <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-8 backdrop-blur-3xl animate-in slide-in-from-bottom-8 duration-700 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <img
                src={selectedQueueItem.songId?.imageUrl}
                className="h-40 w-40 rounded-[32px] object-cover shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
                alt=""
              />
              {selectedQueueItem.status === RoomQueueItemStatus.PLAYING && (
                <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-[12px] font-black uppercase px-3 py-1 rounded-xl shadow-xl border border-white/20 ring-4 ring-black/20">
                  Playing
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h4 className="text-4xl font-black text-white truncate drop-shadow-lg">
                  {selectedQueueItem.songId?.name}
                </h4>
                <Tooltip title="Click vào card bài hát phía trên để đổi mục đang chọn">
                  <InfoCircleOutlined className="text-white/20 hover:text-white/40 cursor-help text-lg" />
                </Tooltip>
              </div>
              <p className="text-emerald-400 font-bold text-xl tracking-widest opacity-90 uppercase mt-2">
                {selectedQueueItem.songId?.artistId?.name}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                {isHost && selectedQueueItem.status !== RoomQueueItemStatus.PLAYING && (
                  <Button
                    danger
                    type="primary"
                    icon={<DeleteOutlined />}
                    className="h-12 rounded-2xl bg-rose-500 hover:!bg-rose-600 border-none px-8 font-bold text-base shadow-lg shadow-rose-500/20 transition-all"
                    onClick={() => handleResolveRequest(selectedQueueItem._id, RoomQueueItemStatus.REJECTED)}
                  >
                    Gỡ khỏi danh sách
                  </Button>
                )}
                
                {selectedQueueItem.status === RoomQueueItemStatus.PLAYING && (
                  <div className="px-6 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium italic">
                    Bài hát này đang được phát trong phòng
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}