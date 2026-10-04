import React, { useEffect, useRef } from 'react';

interface WebCursorProps {
  theme: 'classic' | 'miles' | '2099';
}

export const WebCursor: React.FC<WebCursorProps> = ({ theme }) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);

  const getAccentColor = () => {
    if (theme === 'miles') return '#ff0055';
    if (theme === '2099') return '#00e5ff';
    return '#ef233c';
  };

  useEffect(() => {
    // Pure hardware-accelerated coordinates tracking (zero React state overhead)
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let rafId: number;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
      }

      // Fast direct dot positioning without waiting for RAF
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
        isHovering = !!interactive;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      if (ripple) {
        ripple.style.left = `${mouseX}px`;
        ripple.style.top = `${mouseY}px`;
        ripple.style.transform = 'translate(-50%, -50%) scale(0.5)';
        ripple.style.opacity = '0.9';
        ripple.classList.remove('animate-web-ripple');
        // Force reflow
        void ripple.offsetWidth;
        ripple.classList.add('animate-web-ripple');
      }
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth physics loop for the trailing Spider-Man reticle ring (lerp 0.22)
    const animate = () => {
      // Lerp ring towards mouse
      const ease = 0.22;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ring) {
        const scale = isClicking ? 0.8 : isHovering ? 1.6 : 1;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;

        if (isHovering) {
          ring.style.borderColor = getAccentColor();
          ring.style.backgroundColor = `${getAccentColor()}18`;
        } else {
          ring.style.borderColor = `${getAccentColor()}80`;
          ring.style.backgroundColor = 'transparent';
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [theme]);

  const accent = getAccentColor();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Precision Core Dot (Tracks 1:1 instantaneously with 0ms delay) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 will-change-transform shadow-[0_0_8px_rgba(239,35,60,0.8)]"
        style={{
          backgroundColor: accent,
        }}
      />

      {/* Spider-Sense Magnetic Follower Ring (Silky spring physics with target reticle) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-dashed -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-150 will-change-transform flex items-center justify-center"
        style={{
          borderColor: `${accent}80`,
          boxShadow: `0 0 12px ${accent}30`,
        }}
      >
        {/* Subtle crosshairs inside reticle */}
        <div
          className="w-1.5 h-[1px] absolute"
          style={{ backgroundColor: `${accent}90` }}
        />
        <div
          className="h-1.5 w-[1px] absolute"
          style={{ backgroundColor: `${accent}90` }}
        />
      </div>

      {/* Web Shockwave Ripple on Click */}
      <div
        ref={rippleRef}
        className="fixed pointer-events-none w-14 h-14 rounded-full border border-[#ef233c] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        style={{
          borderColor: accent,
          boxShadow: `0 0 15px ${accent}`,
        }}
      />
    </div>
  );
};
