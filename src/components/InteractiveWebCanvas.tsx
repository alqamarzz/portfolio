import React, { useEffect, useRef } from 'react';

interface WebCanvasProps {
  theme: 'classic' | 'miles' | '2099';
  isLight?: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface WebBurst {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  spokes: number;
}

export const InteractiveWebCanvas: React.FC<WebCanvasProps> = ({ theme, isLight = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const nodeCount = Math.min(Math.floor((width * height) / 16000), 60);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
      });
    }

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const bursts: WebBurst[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      bursts.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: Math.random() * 30 + 45,
        opacity: 0.8,
        spokes: 8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const getColors = () => {
      if (isLight) {
        return {
          node: 'rgba(225, 29, 72, 0.6)',
          line: 'rgba(15, 23, 42, 0.08)',
          mouseLine: 'rgba(2, 132, 199, 0.5)',
          burst: 'rgba(225, 29, 72, ',
        };
      }
      if (theme === 'miles') {
        return {
          node: 'rgba(255, 0, 85, 0.5)',
          line: 'rgba(255, 0, 85, 0.12)',
          mouseLine: 'rgba(255, 230, 0, 0.35)',
          burst: 'rgba(255, 0, 85, ',
        };
      } else if (theme === '2099') {
        return {
          node: 'rgba(0, 229, 255, 0.5)',
          line: 'rgba(168, 85, 247, 0.14)',
          mouseLine: 'rgba(0, 229, 255, 0.35)',
          burst: 'rgba(0, 229, 255, ',
        };
      } else {
        return {
          node: 'rgba(239, 35, 60, 0.5)',
          line: 'rgba(239, 35, 60, 0.12)',
          mouseLine: 'rgba(0, 210, 255, 0.3)',
          burst: 'rgba(255, 255, 255, ',
        };
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();

      // Render & update web bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.radius += 2.5;
        b.opacity -= 0.025;

        if (b.opacity <= 0 || b.radius >= b.maxRadius) {
          bursts.splice(i, 1);
          continue;
        }

        // Draw radial spider web spokes
        ctx.strokeStyle = `${colors.burst}${b.opacity})`;
        ctx.lineWidth = 1;
        for (let s = 0; s < b.spokes; s++) {
          const angle = (s * (Math.PI * 2)) / b.spokes;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + Math.cos(angle) * b.radius, b.y + Math.sin(angle) * b.radius);
          ctx.stroke();
        }

        // Concentric rings
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 0.5, 0, Math.PI * 2);
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 1.8;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;

            // Elastic silk strand to cursor
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = colors.mouseLine;
            ctx.lineWidth = (1 - dist / maxDist) * 1.5;
            ctx.stroke();
          }
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.node;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const connectDist = 135;

          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = (1 - dist / connectDist) * 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-700"
    />
  );
};
