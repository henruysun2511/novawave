"use client";

import { formatDuration } from "@/libs/fomat";
import { RoomDetail } from "@/types/object.type";

interface RoomLyricsPanelProps {
  room: RoomDetail;
  playbackSeconds: number;
  durationSeconds: number;
}

export function RoomLyricsPanel({ room, playbackSeconds, durationSeconds }: RoomLyricsPanelProps) {
  const currentSong = room.currentSong;
  const progressPercent = durationSeconds > 0 ? Math.min(100, (playbackSeconds / durationSeconds) * 100) : 0;

  return (
    <div className="flex h-full min-h-0 flex-col p-4 md:p-6">
      <div className="rounded-2xl border border-white/10 bg-[rgba(18,18,18,0.62)] p-4">
        <div className="text-xs uppercase tracking-[0.25em] text-emerald-300">Lyrics</div>
        <div className="mt-2 text-lg font-semibold text-white">{currentSong?.name || "Chưa có bài hát"}</div>
        <div className="text-sm text-white/60">{currentSong?.artistId?.name || "Chưa có nghệ sĩ"}</div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-white/55">
            <span>{formatDuration(playbackSeconds)}</span>
            <span>{formatDuration(durationSeconds)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(18,18,18,0.62)] p-4">
        {currentSong?.lyrics?.trim() ? (
          <p className="whitespace-pre-wrap leading-7 text-white/85">{currentSong.lyrics}</p>
        ) : (
          <div className="py-10 text-center text-sm text-white/50">Bài hát này chưa có lyrics.</div>
        )}
      </div>
    </div>
  );
}
