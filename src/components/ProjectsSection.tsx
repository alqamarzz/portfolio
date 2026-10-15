import React, { useRef, useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { GithubIcon } from './Icons';
import { ExternalLink, Sparkles, Play, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  missionCode: string;
  badge: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  color: string;
  /** Place the .mp4 screen-recording at public/videos/<id>.mp4 */
  videoSrc: string;
}

interface ProjectsSectionProps {
  triggerSpiderSense: (msg?: string) => void;
}

/* ─────────────────────────────────────────────────────────────
   Project data
───────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 'solana-scrub-chart',
    title: 'Solana Scrub Chart',
    missionCode: 'MISSION #SOL-99',
    badge: 'Web3',
    description:
      'High-frequency interactive token price scrubber for Solana traders. Sub-millisecond cursor tracking, momentum scrubbing, dynamic area fills, and live tooltip metrics.',
    stack: ['Solana', 'TypeScript', 'Canvas / SVG', 'Tailwind CSS'],
    github: 'https://github.com/alqamarzz/solana-scrub-chart',
    demo: 'https://solana-scrub-chart.vercel.app',
    color: '#00d2ff',
    videoSrc: '/videos/solana-scrub-chart.mp4',
  },
  {
    id: 'card-pieces-swipe-deck',
    title: 'Card Pieces Swipe Deck',
    missionCode: 'MISSION #SWIPE-07',
    badge: 'Tactile UI',
    description:
      'Physics-based multi-layered card swipe engine with multi-touch dragging, velocity threshold releases, elastic spring recoil, and fragmented card-piece transitions.',
    stack: ['React', 'Framer Motion', 'Gesture API', 'TypeScript'],
    github: 'https://github.com/alqamarzz/card-pieces-swipe-deck',
    demo: 'https://card-pieces-swipe-deck.vercel.app',
    color: '#ef233c',
    videoSrc: '/videos/card-pieces-swipe-deck.mp4',
  },
  {
    id: 'bubble-navbar',
    title: 'Dynamic Bubble Pill Navbar',
    missionCode: 'MISSION #NAV-01',
    badge: 'Micro-Interaction',
    description:
      'Physics-driven floating pill navbar with spring-based magnetic hover bubbles, layoutId animated pill shifts, and dual-layer specular glassmorphism.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/alqamarzz/navbaar',
    demo: 'https://navbaar-two.vercel.app',
    color: '#38bdf8',
    videoSrc: '/videos/bubble-navbar.mp4',
  },
  {
    id: 'otp-code-input',
    title: 'MetalForge OTP Input',
    missionCode: 'MISSION #OTP-06',
    badge: 'Tactile UI',
    description:
      'Apple/MetalForge-inspired 6-digit verification input with fluid sliding indicator, spring pop-up digits, morphing verification pill, and sequential drop-dissolve rejection.',
    stack: ['Modern CSS', 'JavaScript', 'Spring Physics', 'Micro-Interactions'],
    github: 'https://github.com/alqamarzz/otp-code-input',
    demo: 'https://otp-code-input.vercel.app',
    color: '#22c55e',
    videoSrc: '/videos/otp-code-input.mp4',
  },
  {
    id: 'credit-card-3d',
    title: '3D Skeuomorphic Credit Card',
    missionCode: 'MISSION #CARD-42',
    badge: '3D Simulation',
    description:
      'Tactile 3D banking card with real-time CVV flipping, dynamic holographic foil reflection mapped to mouse angle, chip specular glare, and synchronized form typing.',
    stack: ['React', 'CSS 3D Transforms', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/alqamarzz/Credit_Card',
    demo: 'https://creditcard-five-phi.vercel.app',
    color: '#ffd166',
    videoSrc: '/videos/credit-card-3d.mp4',
  },
  {
    id: 'swipe-action-row',
    title: 'Tactile Swipe Action Row',
    missionCode: 'MISSION #ROW-19',
    badge: 'Component Kit',
    description:
      'Mobile-first swipe-to-reveal row action component mimicking native iOS/Android lists with rubber-banding resistance, haptic ticks, and action triggers.',
    stack: ['React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/alqamarzz/swipe-action-row',
    demo: 'https://swipe-action-row.vercel.app',
    color: '#a855f7',
    videoSrc: '/videos/swipe-action-row.mp4',
  },
  {
    id: 'solana-ecosystem-tracker',
    title: 'Solana Telemetry Oracle',
    missionCode: 'MISSION #ORACLE-24',
    badge: 'Automated CI/CD',
    description:
      'Automated daily telemetry engine tracking Solana Mainnet TPS, DeFi TVL, price volatility, and epoch metrics via scheduled GitHub Actions git-scraping.',
    stack: ['GitHub Actions', 'Solana RPC', 'TypeScript', 'DeFiLlama API'],
    github: 'https://github.com/alqamarzz/solana-ecosystem-tracker',
    demo: 'https://github.com/alqamarzz/solana-ecosystem-tracker#readme',
    color: '#14F195',
    videoSrc: '/videos/solana-ecosystem-tracker.mp4',
  },
];

/* ─────────────────────────────────────────────────────────────
   Single project card
───────────────────────────────────────────────────────────── */
const ProjectCard: React.FC<{
  project: Project;
  triggerSpiderSense: (msg?: string) => void;
}> = ({ project, triggerSpiderSense }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <article className="w-[300px] sm:w-[340px] shrink-0 rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)] bg-white/[0.03] backdrop-blur-sm cursor-default">

      {/* ── Video / Fallback Preview ── */}
      <div className="relative w-full h-[185px] overflow-hidden bg-[#09090f] shrink-0">

        {/* Video element — autoplays (muted) as marquee rolls */}
        {!videoFailed && (
          <video
            ref={videoRef}
            src={project.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}

        {/* Fallback gradient — shown if video fails to load */}
        {videoFailed && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{
              background: `radial-gradient(ellipse at 50% 70%, ${project.color}1a 0%, #09090f 75%)`,
            }}
          >
            {/* dot-grid texture */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div
              className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: `${project.color}14`,
                borderColor: `${project.color}28`,
                color: project.color,
              }}
            >
              <Play className="w-6 h-6 opacity-50" />
            </div>
            <p className="relative z-10 text-[10px] font-mono-tech text-zinc-500 text-center px-4">
              Drop&nbsp;
              <span className="text-zinc-400 font-semibold">public{project.videoSrc}</span>
              &nbsp;to enable preview
            </p>
          </div>
        )}

        {/* Mission + badge overlays */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="font-comic text-[10px] text-[#ef233c] uppercase tracking-wider bg-black/65 px-2.5 py-1 rounded-full border border-[#ef233c]/25 backdrop-blur-md">
            {project.missionCode}
          </span>
          <span
            className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-black/65 border border-white/10 backdrop-blur-md font-semibold"
            style={{ color: project.color }}
          >
            {project.badge}
          </span>
        </div>

        {/* Bottom gradient fade into card body */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#0c0c12] to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3 bg-[#0c0c12]">

        {/* Title + description */}
        <div>
          <h3 className="font-heading text-[14px] font-bold text-white/90 group-hover:text-white transition-colors mb-1 leading-snug">
            {project.title}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-zinc-500">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* CTA links */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); sound.playClick(); }}
            className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            Source
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playThwip();
              triggerSpiderSense(`Launching ${project.title}`);
            }}
            className="flex-1 py-2 px-3 rounded-lg text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all hover:brightness-110 hover:shadow-[0_0_16px_rgba(0,0,0,0.5)] cursor-pointer"
            style={{ backgroundColor: project.color, color: '#000' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ triggerSpiderSense }) => {
  // Duplicate so the strip loops seamlessly
  const doubled = [...PROJECTS, ...PROJECTS];

  const stripRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>();
  const isPaused   = useRef(false);
  const isDragging = useRef(false);
  const dragX      = useRef(0);
  const dragScroll = useRef(0);

  /* ── RAF auto-scroll (0.8 px / frame ≈ 48 px/s at 60 fps) ── */
  useEffect(() => {
    const tick = () => {
      const el = stripRef.current;
      if (el && !isPaused.current && !isDragging.current) {
        el.scrollLeft += 0.8;
        // Seamless loop
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* ── Passive scroll listener: seamless loop + pause/resume ──
     We do NOT intercept wheel/touch — the browser handles native
     two-finger swipe / touch scroll naturally on an overflow-x-scroll
     container. We just react to the resulting scroll event.           */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let resumeTimer: ReturnType<typeof setTimeout>;
    let looping = false;

    const onScroll = () => {
      // Pause auto-scroll while user is interacting
      if (!isDragging.current) isPaused.current = true;

      // Seamless infinite loop
      if (!looping) {
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          looping = true;
          el.scrollLeft -= half;
          requestAnimationFrame(() => { looping = false; });
        } else if (el.scrollLeft < 0) {
          looping = true;
          el.scrollLeft += half;
          requestAnimationFrame(() => { looping = false; });
        }
      }

      // Resume auto-scroll 900 ms after scroll activity stops
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { isPaused.current = false; }, 900);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      clearTimeout(resumeTimer);
    };
  }, []);

  /* ── Mouse hover / click-drag ── */
  const onMouseEnter = () => { isPaused.current = true; };
  const onMouseLeave = () => { isPaused.current = false; isDragging.current = false; };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragX.current      = e.clientX;
    dragScroll.current = stripRef.current?.scrollLeft ?? 0;
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !stripRef.current) return;
    stripRef.current.scrollLeft = dragScroll.current - (e.clientX - dragX.current);
  };

  const onMouseUp = () => { isDragging.current = false; };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#ef233c]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-tech mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Classified Missions · Tactile Labs</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
              <span className="text-inherit">Shipped </span>
              <span className="text-[#ef233c] font-comic">Missions</span>
              {' '}& Craft
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-2">
              Interactive micro-interaction specimens and tactile systems engineered with spring physics and 60fps polish.
            </p>
          </div>

          {/* Hint */}
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 self-start sm:self-auto">
            <ArrowRight className="w-4 h-4 text-[#ef233c] shrink-0" />
            <span className="uppercase tracking-wider">Trackpad swipe or Drag to explore · Hover pauses</span>
          </div>
        </div>
      </div>

      {/* ── Marquee Strip ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={stripRef}
          className="overflow-x-scroll no-scrollbar rounded-2xl cursor-grab active:cursor-grabbing select-none"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          <div className="flex items-stretch gap-5 w-max py-5 px-4">
            {doubled.map((project, idx) => (
              <ProjectCard
                key={`${project.id}-${idx}`}
                project={project}
                triggerSpiderSense={triggerSpiderSense}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom GitHub CTA ── */}
      <div className="flex items-center justify-center mt-10">
        <a
          href="https://github.com/alqamarzz"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playThwip()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:border-[#ef233c]/40 text-sm font-semibold transition-all hover:shadow-[0_0_24px_rgba(239,35,60,0.12)]"
        >
          <GithubIcon className="w-4 h-4" />
          View all on GitHub
          <ArrowRight className="w-3.5 h-3.5 text-[#ef233c]" />
        </a>
      </div>
    </section>
  );
};

