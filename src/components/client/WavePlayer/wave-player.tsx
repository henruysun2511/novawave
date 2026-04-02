import { usePlayerStore } from "@/stores/usePlayerStore";
import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WavePlayerProps {
  url: string;
  currentTime: number;
  onSeek?: (time: number) => void;
  songId: string;
}

const WavePlayer: React.FC<WavePlayerProps> = ({
  url,
  currentTime,
  onSeek,
  songId,
}) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioRef = usePlayerStore((state) => state.audioRef);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const status = usePlayerStore((state) => state.status);
  const nowPlayingSongId = status.nowPlayingId || (status.nowPlaying && typeof status.nowPlaying !== 'string' ? status.nowPlaying._id : status.nowPlaying);
  const onSeekRef = useRef<((time: number) => void) | null>(null);

  // Chỉ hiển thị wave nếu đúng bài hát này đang phát
  const isThisSongPlaying = songId === nowPlayingSongId;

  useEffect(() => {
    onSeekRef.current = onSeek || null;
  }, [onSeek]);

  // INIT WAVESURFER - chỉ khởi tạo khi bài hát này đang phát
  useEffect(() => {
    if (!isThisSongPlaying || !waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,

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
    ws.load(url);

    (ws as any).on("seek", (progress: number) => {
      if (!ws.getDuration()) return;
      const time = progress * ws.getDuration();
      onSeekRef.current?.(time);
    });

    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };
  }, [url, isThisSongPlaying]);

  // Sync wave progress với audio player liên tục khi playing
  useEffect(() => {
    if (!audioRef || !isPlaying || !isThisSongPlaying) return;

    const handleTimeUpdate = () => {
      const ws = wavesurferRef.current;
      if (!ws || !ws.getDuration() || !audioRef) return;

      // Update wave progress based on audio currentTime
      const progress = audioRef.currentTime / (audioRef.duration || 1);
      ws.seekTo(progress);
    };

    audioRef.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioRef.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioRef, isPlaying, isThisSongPlaying]);

  // Sync wave position khi currentTime thay đổi (từ external seek)
  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !ws.getDuration() || !isThisSongPlaying) return;

    // Kiểm tra xem user đang drag hay không
    // Nếu diff > 0.5s thì coi như external seek, không phải user drag
    const diff = Math.abs(ws.getCurrentTime() - currentTime);
    if (diff > 0.5) {
      ws.seekTo(currentTime / ws.getDuration());
    }
  }, [currentTime, isThisSongPlaying]);

  return (
    <>
      {isThisSongPlaying ? (
        <div className="wave-wrapper">
          <div ref={waveformRef} id="waveform" />
        </div>
      ) : (
        <div className="wave-wrapper h-[90px] bg-[rgba(255,255,255,0.1)] rounded flex items-center justify-center">
          <p className="text-text-secondary text-sm">Phát bài hát này để xem sóng âm thanh</p>
        </div>
      )}
    </>
  );
};

export default WavePlayer;
