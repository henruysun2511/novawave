import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WavePlayerProps {
  url: string;
  currentTime: number;
  onSeek?: (time: number) => void;
}

const WavePlayer: React.FC<WavePlayerProps> = ({
  url,
  currentTime,
  onSeek,
}) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // INIT WAVESURFER
  useEffect(() => {
    if (!waveformRef.current) return;

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
      onSeek?.(time);
    });

    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };
  }, [url]);


  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !ws.getDuration()) return;

    const diff = Math.abs(ws.getCurrentTime() - currentTime);
    if (diff > 0.3) {
      ws.seekTo(currentTime / ws.getDuration());
    }
  }, [currentTime]);

  return (
    <div className="wave-wrapper">
      <div ref={waveformRef} id="waveform" />
    </div>
  );
};

export default WavePlayer;
