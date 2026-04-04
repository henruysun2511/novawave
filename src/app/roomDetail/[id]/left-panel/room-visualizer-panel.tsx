"use client";

import { useEffect, useRef } from "react";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  songName?: string; // Thêm prop tên bài hát
}

// Singleton để tránh lỗi treo AudioContext khi chuyển tab
let sharedAudioCtx: AudioContext | null = null;
let sharedAnalyser: AnalyserNode | null = null;
let sharedSource: MediaElementAudioSourceNode | null = null;

class Star {
  x: number; y: number; z: number;
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth - canvasWidth / 2;
    this.y = Math.random() * canvasHeight - canvasHeight / 2;
    this.z = Math.random() * canvasWidth;
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

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function RoomVisualizer({ audioRef, songName = "Đang phát..." }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stars = useRef<Star[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

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
      for (let i = 0; i < 300; i++) stars.current.push(new Star(canvas.width, canvas.height));
    }

    const render = () => {
      sharedAnalyser!.getByteFrequencyData(dataArray);

      // Phân tích Bass
      let bass = 0;
      for (let i = 0; i < 12; i++) bass += dataArray[i];
      bass = bass / 12;
      const bassFactor = bass / 255;

      // Background tối sâu với hiệu ứng mờ nhẹ để tạo trail
      ctx.fillStyle = "rgba(5, 5, 5, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Vẽ các hạt sao (Space Travel effect)
      const starSpeed = 1.5 + bassFactor * 25;
      stars.current.forEach(star => {
        star.update(starSpeed, canvas.width, canvas.height);
        star.draw(ctx, canvas.width, canvas.height);
      });

      // 2. Vẽ vòng tròn phát sáng (Glow Circle)
      const baseRadius = 100 + bassFactor * 30;
      ctx.save();
      ctx.shadowBlur = 20 + bassFactor * 40;
      ctx.shadowColor = "#10b981";
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(16, 185, 129, ${0.4 + bassFactor * 0.6})`;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // 3. Vẽ sóng nhạc đối xứng 
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * 150;
        const angle = (i / bufferLength) * Math.PI * 2;

        const x1 = centerX + Math.cos(angle) * (baseRadius + 5);
        const y1 = centerY + Math.sin(angle) * (baseRadius + 5);
        const x2 = centerX + Math.cos(angle) * (baseRadius + 5 + barHeight);
        const y2 = centerY + Math.sin(angle) * (baseRadius + 5 + barHeight);

        const hue = (i / bufferLength) * 360;
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.6 + bassFactor * 0.4})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 4. Center Text (Tên bài hát)
      ctx.save();
      ctx.fillStyle = "white";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // Font size tự động nhỏ lại nếu tên quá dài
      const fontSize = songName.length > 20 ? 14 : 18;
      ctx.font = `bold ${fontSize}px "Inter", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Vẽ text tối đa 2 dòng nếu cần hoặc cắt bớt
      const displayTitle = songName.length > 35 ? songName.substring(0, 32) + "..." : songName;
      ctx.fillText(displayTitle.toUpperCase(), centerX, centerY);
      ctx.restore();

      animationRef.current = requestAnimationFrame(render);
    };

    if (sharedAudioCtx.state === "suspended") {
      const resumeAudio = () => sharedAudioCtx?.resume();
      window.addEventListener('click', resumeAudio, { once: true });
    }

    render();

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        // Re-init stars for new size
        stars.current = [];
        for (let i = 0; i < 300; i++) stars.current.push(new Star(canvas.width, canvas.height));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [audioRef, songName]); // Thêm songName vào dependency để cập nhật text khi đổi bài

  return (
    <div className="relative h-full min-h-[500px] w-full rounded-[32px] overflow-hidden border border-white/10 bg-black shadow-2xl">
      <canvas ref={canvasRef} className="h-full w-full block" />

      {/* Overlay UI */}
      <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-[10px] text-white/80 font-black tracking-[0.2em] uppercase">
          Live Visualizer
        </span>
      </div>
    </div>
  );
}