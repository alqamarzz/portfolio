import React, { useEffect, useState } from 'react';

export const ScrollWebProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spider web-strand path points
  const svgW = 4;
  const svgH = 100;

  return (
    <div className="fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-0 pointer-events-none hidden md:flex">
      {/* Web strand SVG */}
      <svg
        width={svgW + 6}
        height={180}
        viewBox={`0 0 ${svgW + 6} ${svgH}`}
        className="overflow-visible"
      >
        {/* Background track strand */}
        <line
          x1={svgW / 2 + 3}
          y1="0"
          x2={svgW / 2 + 3}
          y2={svgH}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        {/* Progress fill */}
        <line
          x1={svgW / 2 + 3}
          y1="0"
          x2={svgW / 2 + 3}
          y2={(svgH * progress) / 100}
          stroke="#ef233c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Spider bead at progress head */}
        <circle
          cx={svgW / 2 + 3}
          cy={(svgH * progress) / 100}
          r="4"
          fill="#ef233c"
          className="drop-shadow-[0_0_5px_rgba(239,35,60,0.9)]"
        />
      </svg>
      {/* Percentage label */}
      <span
        className="font-mono-tech text-[9px] text-zinc-500 mt-1 tabular-nums"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
};
