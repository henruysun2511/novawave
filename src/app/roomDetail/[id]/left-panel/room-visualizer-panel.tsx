"use client";

import { useEffect, useRef } from "react";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

// Singleton để tránh lỗi treo AudioContext khi chuyển tab
let sharedAudioCtx: AudioContext | null = null;
let sharedAnalyser: AnalyserNode | null = null;
let sharedSource: MediaElementAudioSourceNode | null = null;

class Star {
  x: number; y: number; z: number; px: number; py: number;
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth - canvasWidth / 2;
    this.y = Math.random() * canvasHeight - canvasHeight / 2;
    this.z = Math.random() * canvasWidth;
    this.px = 0; this.py = 0;
  }

  update(speed: number, canvasWidth: number, canvasHeight: number) {
    this.z -= speed;
    if (this.z < 1) {
      this.z = canvasWidth;
      this.x = Math.random() * canvasWidth - canvasWidth / 2;
      this.y = Math.random() * canvasHeight - canvasHeight / 2;
    }
  }

  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    const sx = (this.x / this.z) * canvasWidth + canvasWidth / 2;
    const sy = (this.y / this.z) * canvasHeight + canvasHeight / 2;
    const r = (1 - this.z / canvasWidth) * 2;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function RoomVisualizerDJ({ audioRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stars = useRef<Star[]>([]);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    // Setup Audio
    if (!sharedAudioCtx) {
      sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      sharedAnalyser = sharedAudioCtx.createAnalyser();
      sharedAnalyser.fftSize = 512;
    }

    if (!sharedSource) {
      try {
        sharedSource = sharedAudioCtx.createMediaElementSource(audio);
        sharedSource.connect(sharedAnalyser!);
        sharedAnalyser!.connect(sharedAudioCtx.destination);
      } catch (e) { console.warn("Audio source already connected"); }
    }

    const bufferLength = sharedAnalyser!.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Init Stars
    if (stars.current.length === 0) {
      for (let i = 0; i < 200; i++) stars.current.push(new Star(canvas.width, canvas.height));
    }

    const render = () => {
      requestAnimationFrame(render);
      sharedAnalyser!.getByteFrequencyData(dataArray);

      // Phân tích Bass
      let bass = 0;
      for (let i = 0; i < 10; i++) bass += dataArray[i];
      bass = bass / 10;
      const bassFactor = bass / 255;

      // Background tối sâu
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Vẽ các hạt sao (Space Travel effect)
      const starSpeed = 2 + bassFactor * 20;
      stars.current.forEach(star => {
        star.update(starSpeed, canvas.width, canvas.height);
        star.draw(ctx, canvas.width, canvas.height);
      });

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 2. Vẽ vòng tròn phát sáng (Glow Circle)
      ctx.save();
      ctx.shadowBlur = 15 + bassFactor * 30;
      ctx.shadowColor = "#10b981";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80 + bassFactor * 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // 3. Vẽ sóng nhạc đối xứng 
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * 120;
        const angle = (i / bufferLength) * Math.PI * 2;

        const x1 = centerX + Math.cos(angle) * (85 + bassFactor * 10);
        const y1 = centerY + Math.sin(angle) * (85 + bassFactor * 10);
        const x2 = centerX + Math.cos(angle) * (85 + barHeight + bassFactor * 20);
        const y2 = centerY + Math.sin(angle) * (85 + barHeight + bassFactor * 20);

        // Gradient theo tần số
        const hue = (i / bufferLength) * 360;
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.5 + bassFactor})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 4. Center Logo / Text
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("DJ REMIX", centerX, centerY + 7);
    };

    if (sharedAudioCtx.state === "suspended") sharedAudioCtx.resume();
    render();

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [audioRef]);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]">
      <canvas ref={canvasRef} className="h-full w-full block" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Visualizer Active</span>
      </div>
    </div>
  );
}