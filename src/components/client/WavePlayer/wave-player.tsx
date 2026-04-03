import { usePlayerStore } from "@/stores/usePlayerStore";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export interface WaveCommentMarker {
  id?: string;
  timeSec: number;
  avatarUrl?: string;
}

interface WavePlayerProps {
  url: string;
  currentTime: number;
  onSeek?: (time: number) => void;
  songId: string;
  /** Hiện sóng ngay cả khi chưa phát bài (trang chi tiết bài hát) */
  alwaysShowWave?: boolean;
  /** Marker avatar comment theo thời gian (giây) */
  commentMarkers?: WaveCommentMarker[];
}

const WavePlayer: React.FC<WavePlayerProps> = ({
  url,
  currentTime,
  onSeek,
  songId,
  alwaysShowWave = false,
  commentMarkers = [],
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioRef = usePlayerStore((state) => state.audioRef);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const status = usePlayerStore((state) => state.status);
  const nowPlayingSongId =
    status.nowPlayingId ||
    (status.nowPlaying && typeof status.nowPlaying !== "string" ? status.nowPlaying._id : status.nowPlaying);
  const onSeekRef = useRef<((time: number) => void) | null>(null);
  const [waveDuration, setWaveDuration] = useState(0);

  const isThisSongPlaying = songId === nowPlayingSongId;
  const shouldInitWave = (alwaysShowWave || isThisSongPlaying) && !!url;

  useEffect(() => {
    onSeekRef.current = onSeek || null;
  }, [onSeek]);

  useEffect(() => {
    if (!shouldInitWave || !waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      url,
      waveColor: "rgba(255,255,255,0.45)",
      progressColor: "#1DB954",
      cursorColor: "#1DB954",
      cursorWidth: 2,
      barWidth: 2,
      barGap: 1.5,
      barRadius: 2,
      height: 90,
      normalize: true,
      interact: true,
      dragToSeek: true,
    });

    wavesurferRef.current = ws;

    const unsubReady = ws.on("ready", () => {
      setWaveDuration(ws.getDuration() || 0);
    });

    // WaveSurfer v7: click / kéo tua phát sự kiện interaction (thời gian = giây)
    const unsubInteraction = ws.on("interaction", (time: number) => {
      onSeekRef.current?.(time);
    });

    return () => {
      unsubReady();
      unsubInteraction();
      ws.destroy();
      wavesurferRef.current = null;
      setWaveDuration(0);
    };
  }, [url, shouldInitWave]);

  useEffect(() => {
    if (!audioRef || !isPlaying || !isThisSongPlaying) return;

    const handleTimeUpdate = () => {
      const ws = wavesurferRef.current;
      if (!ws || !ws.getDuration() || !audioRef) return;
      const progress = audioRef.currentTime / (audioRef.duration || 1);
      ws.seekTo(progress);
    };

    audioRef.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, isPlaying, isThisSongPlaying]);

  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !ws.getDuration() || !isThisSongPlaying) return;

    const diff = Math.abs(ws.getCurrentTime() - currentTime);
    if (diff > 0.5) {
      ws.seekTo(currentTime / ws.getDuration());
    }
  }, [currentTime, isThisSongPlaying]);

  const showWaveUi = shouldInitWave;

  return (
    <div ref={wrapperRef} className="relative w-full">
      {showWaveUi ? (
        <>
          <div className="wave-wrapper relative">
            <div ref={waveformRef} id="waveform" />
            {waveDuration > 0 &&
              commentMarkers.map((m) => {
                const t = Math.min(Math.max(0, m.timeSec), waveDuration - 0.01);
                const leftPct = (t / waveDuration) * 100;
                return (
                  <button
                    key={m.id ?? `${m.timeSec}-${m.avatarUrl ?? ""}`}
                    type="button"
                    title={`${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`}
                    className="absolute bottom-0 z-10 -translate-x-1/2 transform rounded-full border-2 border-[#1DB954] bg-black/40 shadow-[0_0_8px_rgba(29,185,84,0.6)] transition hover:scale-110"
                    style={{
                      left: `${leftPct}%`,
                      width: 28,
                      height: 28,
                      marginLeft: 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeekRef.current?.(m.timeSec);
                    }}
                  >
                    {m.avatarUrl ? (
                      <img src={m.avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-white">
                        ·
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </>
      ) : (
        <div className="wave-wrapper flex h-[90px] items-center justify-center rounded bg-[rgba(255,255,255,0.1)]">
          <p className="text-sm text-text-secondary">Phát bài hát này để xem sóng âm thanh</p>
        </div>
      )}
    </div>
  );
};

export default WavePlayer;
