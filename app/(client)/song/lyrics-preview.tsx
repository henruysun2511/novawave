"use client";

import { useState } from "react";

type Props = {
  lyrics: string;
  maxLines?: number;
};

export default function LyricsPreview({ lyrics, maxLines = 10 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const lines = lyrics.trim().split("\n");
  const visibleLines = expanded ? lines : lines.slice(0, maxLines);

  return (
    <div className="mt-6 text-white/90 leading-relaxed">
      {visibleLines.map((line, index) => (
        <p key={index} className="mb-1 text-base">
          {line}
        </p>
      ))}

      {lines.length > maxLines && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-green cursor-pointer font-semibold hover:underline"
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}