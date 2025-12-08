"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export function WavePlayer({
  url,
  onReady,
  onSeek,
}: {
  url: string;
  onReady?: (ws: WaveSurfer) => void;
  onSeek?: (time: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#444",
      progressColor: "#22c55e",
      height: 64,
      barWidth: 2,
      cursorColor: "#22c55e",
    });

    ws.load(url);
    waveRef.current = ws;

    ws.on("ready", () => onReady?.(ws));


    return () => ws.destroy();
  }, [url]);

  return <div ref={containerRef} />;
}
