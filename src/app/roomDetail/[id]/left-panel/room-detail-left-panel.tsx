"use client";

import { RoomControlAction, RoomQueueItemStatus } from "@/types/constant.type";
import { RoomDetail, RoomQueueItem } from "@/types/object.type";
import {
  CustomerServiceOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  PlaySquareOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Tabs } from "antd";
import { useEffect, useMemo, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { RoomInfoPanel } from "./room-info-panel";
import { RoomLyricsPanel } from "./room-lyrics-panel";
import { QueueSlider } from "./room-queue-panel";
import { RoomSongBar } from "./room-song-bar";
import { RoomUpdatePanel } from "./room-update-panel"; // Đảm bảo bạn đã tạo file này
import RoomVisualizer from "./room-visualizer-panel";

interface RoomDetailLeftPanelProps {
  room: RoomDetail;
  isHost: boolean;
  playbackSeconds: number;
  durationSeconds: number;
  visibleQueue: RoomQueueItem[];
  requestQueue: RoomQueueItem[];
  selectedQueueItemId: string | null;
  selectedQueueItem: RoomQueueItem | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setAudioElement: (audio: HTMLAudioElement | null) => void;
  setSelectedQueueItemId: (value: string) => void;
  emitHostControl: (action: RoomControlAction, extra?: { currentTime?: number; currentSongId?: string; currentQueueItemId?: string }) => void;
  handleResolveRequest: (queueId: string, status: RoomQueueItemStatus.APPROVED | RoomQueueItemStatus.REJECTED) => void;
  onPlayerListen: (seconds: number) => void;
  onPlayerDurationChange: (seconds: number) => void;
  onPlayerPlay: () => void;
  onPlayerPause: () => void;
  onPlayerSeek: (seconds: number) => void;
  onPlayerEnded: () => void;
}

export function RoomDetailLeftPanel({
  room,
  isHost,
  playbackSeconds,
  durationSeconds,
  visibleQueue,
  requestQueue,
  selectedQueueItemId,
  selectedQueueItem,
  audioRef,
  setAudioElement,
  setSelectedQueueItemId,
  emitHostControl,
  handleResolveRequest,
  onPlayerListen,
  onPlayerDurationChange,
  onPlayerPlay,
  onPlayerPause,
  onPlayerSeek,
  onPlayerEnded,
}: RoomDetailLeftPanelProps) {
  const playerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    const audioElement = playerRef.current?.audio.current ?? null;
    setAudioElement(audioElement);

    if (!audioElement) {
      return () => {
        setAudioElement(null);
      };
    }

    const syncDuration = () => {
      if (audioElement.duration > 0) {
        onPlayerDurationChange(audioElement.duration);
      }
    };

    audioElement.addEventListener("loadedmetadata", syncDuration);
    audioElement.addEventListener("durationchange", syncDuration);
    syncDuration();

    return () => {
      audioElement.removeEventListener("loadedmetadata", syncDuration);
      audioElement.removeEventListener("durationchange", syncDuration);
      setAudioElement(null);
    };
  }, [onPlayerDurationChange, room.currentSong?.mp3Link, setAudioElement]);

  // Khởi tạo danh sách Tabs dựa trên quyền Host
  const tabItems = useMemo(() => {
    const baseItems = [
      {
        key: "info",
        label: (
          <span className="flex items-center gap-2 px-2 py-1">
            <InfoCircleOutlined /> Thông tin phòng
          </span>
        ),
        children: (
          <div className="flex-1 min-h-0 overflow-y-auto">
            <RoomInfoPanel
              room={room}
              isHost={isHost}
              playbackSeconds={playbackSeconds}
              durationSeconds={durationSeconds}
              visibleQueue={visibleQueue}
              requestQueue={requestQueue}
              selectedQueueItemId={selectedQueueItemId}
              selectedQueueItem={selectedQueueItem}
              audioRef={audioRef}
              emitHostControl={emitHostControl}
              setSelectedQueueItemId={setSelectedQueueItemId}
              handleResolveRequest={handleResolveRequest}
            />
          </div>
        )
      },
      {
        key: "queue",
        label: (
          <span className="flex items-center gap-2 px-2 py-1">
            <PlaySquareOutlined /> Danh sách bài hát
          </span>
        ),
        children: (
          <QueueSlider
            visibleQueue={visibleQueue}
            selectedQueueItemId={selectedQueueItemId}
            selectedQueueItem={selectedQueueItem}
            isHost={isHost}
            setSelectedQueueItemId={setSelectedQueueItemId}
            handleResolveRequest={handleResolveRequest}
          />
        )
      },
      {
        key: "lyrics",
        label: (
          <span className="flex items-center gap-2 px-2 py-1">
            <FileTextOutlined /> Lyrics
          </span>
        ),
        children: (
          <RoomLyricsPanel
            room={room}
            playbackSeconds={playbackSeconds}
            durationSeconds={durationSeconds}
          />
        )
      },
      {
        key: "visualizer",
        label: (
          <span className="flex items-center gap-2 px-2 py-1">
            <CustomerServiceOutlined /> Sound Effects
          </span>
        ),
        children: (
          <div className="flex-1 min-h-0 h-[550px] p-4">
            <RoomVisualizer
              audioRef={audioRef}
              songName={room.currentSong?.name || "Đang phát..."}
            />
          </div>
        )
      }
    ];

    if (isHost) {
      baseItems.push({
        key: "settings",
        label: (
          <span className="flex items-center gap-2 px-2 py-1  font-medium">
            <SettingOutlined /> Cài đặt phòng
          </span>
        ),
        children: (
          <div className="flex-1 min-h-0 overflow-y-auto">
            <RoomUpdatePanel room={room} />
          </div>
        )
      });
    }

    return baseItems;
  }, [room, isHost, playbackSeconds, durationSeconds, visibleQueue, requestQueue, selectedQueueItemId, selectedQueueItem, audioRef]);

  return (
    <section className="flex h-full min-h-0 flex-col border-b bg-[#0a0a0a]">
      <div className="flex-1 min-h-0">
        <Tabs
          defaultActiveKey="info"
          className="custom-room-tabs flex-1 flex flex-col min-h-0"
          items={tabItems}
        />
      </div>
      <div className="flex-shrink-0">
        <RoomSongBar
          room={room}
          isHost={isHost}
          playerRef={playerRef}
          audioRef={audioRef}
          playbackSeconds={playbackSeconds}
          durationSeconds={durationSeconds}
          emitHostControl={emitHostControl}
          onPlayerListen={onPlayerListen}
          onPlayerPlay={onPlayerPlay}
          onPlayerPause={onPlayerPause}
          onPlayerSeek={onPlayerSeek}
          onPlayerEnded={onPlayerEnded}
        />
      </div>
    </section>
  );
}