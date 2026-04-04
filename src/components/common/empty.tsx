import { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    action?: ReactNode;
    subtitle?: string; // Thêm subtitle để giải thích rõ hơn
  }
  
  export function EmptyState({ title, action, subtitle }: EmptyStateProps) {
    return (
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent px-8 py-14 text-center shadow-2xl backdrop-blur-sm">
        
        {/* Hiệu ứng ánh sáng nền (Background Glow) */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />
  
        <div className="relative z-10 flex flex-col items-center">
          {/* Custom Illustration SVG */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/[0.02] ring-1 ring-white/10 shadow-inner animate-pulse">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-emerald-500/50"
            >
              <path
                d="M9 18V5L19 3V16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
  
          {/* Text Content */}
          <h3 className="text-xl font-semibold tracking-tight text-white/90">
            {title}
          </h3>
          
          {subtitle && (
            <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-white/40">
              {subtitle}
            </p>
          )}
  
          {/* Action Button */}
          {action && (
            <div className="mt-8 transition-transform hover:scale-105 active:scale-95">
              {action}
            </div>
          )}
        </div>
  
        {/* Trang trí góc (Border accents) */}
        <div className="absolute top-0 left-1/2 h-[1px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>
    );
  }