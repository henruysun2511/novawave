"use client";

import { formatDuration } from "@/libs/fomat";
import { RoomControlAction } from "@/types/constant.type";
import { RoomDetail } from "@/types/object.type";
import AudioPlayer from "react-h5-audio-player";
import { getUserName } from "../room-detail-helpers";
import { useEffect } from "react";

interface RoomSongBarProps {
  room: RoomDetail;
  isHost: boolean;
  playerRef: React.RefObject<AudioPlayer | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playbackSeconds: number;
  durationSeconds: number;
  emitHostControl: (action: RoomControlAction, extra?: any) => void;
  onPlayerListen: (seconds: number) => void;
  onPlayerPlay: () => void;
  onPlayerPause: () => void;
  onPlayerSeek: (seconds: number) => void;
  onPlayerEnded: () => void;
}

export function RoomSongBar({
  room,
  isHost,
  playerRef,
  audioRef,
  playbackSeconds,
  durationSeconds,
  emitHostControl,
  onPlayerListen,
  onPlayerPlay,
  onPlayerPause,
  onPlayerSeek,
  onPlayerEnded,
}: RoomSongBarProps) {
  
  // Gán ref từ AudioPlayer vào audioRef để Visualizer có thể truy cập được
  useEffect(() => {
    if (playerRef.current && playerRef.current.audio.current) {
      // @ts-ignore - Gán element thực tế vào ref được truyền từ cha
      audioRef.current = playerRef.current.audio.current;
    }
  }, [playerRef, audioRef]);

  return (
    <div className="sticky bottom-0 z-10 bg-[rgba(8,8,8,0.8)] px-4 py-4 backdrop-blur-2xl md:px-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr_1fr] lg:items-center">
        {/* Info */}
        <div className="flex items-center gap-3">
          <img 
            src={room.currentSong?.imageUrl || room.imageUrl} 
            alt={room.currentSong?.name || room.name} 
            className="h-16 w-16 rounded-3xl object-cover shadow-lg border border-white/10" 
          />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Đang phát</div>
            <div className="truncate text-lg font-semibold text-white">{room.currentSong?.name || room.name}</div>
            <div className="truncate text-xs text-white/50">{room.currentSong?.artistId?.name || getUserName(room.hostId)}</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className={`${isHost ? "" : "pointer-events-none opacity-80"}`}>
          <AudioPlayer
            ref={playerRef}
            src={room.currentSong?.mp3Link}
            crossOrigin="anonymous" 
            autoPlay={room.isPlaying}
            autoPlayAfterSrcChange={room.isPlaying}
            showSkipControls={isHost}
            showJumpControls={false}
            onClickNext={() => emitHostControl(RoomControlAction.NEXT)}
            listenInterval={250}
            onListen={(event) => onPlayerListen((event.target as HTMLAudioElement).currentTime)}
            onPlay={onPlayerPlay}
            onPause={onPlayerPause}
            onSeeked={(event) => onPlayerSeek((event.target as HTMLAudioElement).currentTime)}
            onEnded={onPlayerEnded}
            className="custom-audio-player rounded-3xl border border-white/5 bg-[rgba(31,31,31,0.6)] px-4 shadow-2xl"
          />
          <div className="mt-2 flex items-center justify-between text-[10px] font-medium tracking-wider text-white/40 px-2">
            <span>{formatDuration(playbackSeconds)}</span>
            <span>{formatDuration(durationSeconds)}</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex flex-wrap items-center justify-end gap-2">
          {!isHost && (
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-medium text-emerald-400 backdrop-blur-md animate-pulse">
              {room.isPlaying ? "Đang đồng bộ cùng chủ phòng" : "Đang chờ chủ phòng..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}