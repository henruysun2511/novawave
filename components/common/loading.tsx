"use client";

import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-500">
            {/* Main Spinner */}
            <div className="relative flex items-center justify-center">
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-[rgba(37,162,106,0.1)] border-t-[var(--color-green)] shadow-[0_0_20px_rgba(37,162,106,0.2)]"></div>
                
                {/* Secondary inner ring */}
                <div className="absolute h-12 w-12 animate-reverse-spin rounded-full border-4 border-t-transparent border-r-[var(--color-green)] opacity-60"></div>
                
                {/* Pulse Glow */}
                <div className="absolute h-24 w-24 animate-ping rounded-full bg-[var(--color-green)] opacity-5 blur-xl"></div>
            </div>
            
            {/* Brand/Text */}
            <div className="mt-8 flex flex-col items-center">
                <h2 className="text-xl font-bold tracking-widest text-[#25A26A] uppercase drop-shadow-md brightness-110">
                    NOVAWAVE
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] font-medium italic animate-pulse">
                   Hòa mình vào âm nhạc...
                </p>
            </div>

            <style jsx>{`
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-reverse-spin {
                    animation: reverse-spin 1.5s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Loading;
