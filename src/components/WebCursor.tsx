import React, { useEffect, useState, useRef } from 'react';

interface WebCursorProps {
  theme: 'classic' | 'miles' | '2099';
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  id: number;
}

export const WebCursor: React.FC<WebCursorProps> = ({ theme }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [clicking, setClicking] = useState(false);
  const counterRef = useRef(0);

  const getAccentColor = () => {
    if (theme === 'miles') return '#ff0055';
    if (theme === '2099') return '#00e5ff';
    return '#ef233c';
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      counterRef.current += 1;
      const id = counterRef.current;
      const p: TrailPoint = { x: e.clientX, y: e.clientY, opacity: 0.6, id };

      setTrail((prev) => {
        const next = [p, ...prev.slice(0, 10)];
        return next;
      });
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  // Fade trail
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.07 }))
          .filter((p) => p.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [trail]);

  const accent = getAccentColor();

  return (
    <>
      {/* Trail */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] overflow-visible">
        {trail.map((p, i) => {
          const next = trail[i + 1];
          if (!next) return null;
          return (
            <line
              key={p.id}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke={accent}
              strokeWidth={p.opacity * 2}
              strokeOpacity={p.opacity}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[101] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: pos.x, top: pos.y }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-100 ${clicking ? 'scale-150' : 'scale-100'}`}
          style={{
            width: clicking ? 14 : 10,
            height: clicking ? 14 : 10,
            backgroundColor: accent,
            borderColor: 'white',
            boxShadow: `0 0 10px ${accent}`,
          }}
        />
      </div>
    </>
  );
};
