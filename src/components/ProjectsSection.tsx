import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import { GithubIcon } from './Icons';
import { 
  ExternalLink, 
  Layers, 
  TrendingUp, 
  CreditCard, 
  MoveRight, 
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Activity,
  Navigation
} from 'lucide-react';

interface ProjectsSectionProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ triggerSpiderSense }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navActiveTab, setNavActiveTab] = useState('Home');

  // Interactive Solana scrubber state
  const [scrubX, setScrubX] = useState<number | null>(null);
  const chartBoxRef = useRef<HTMLDivElement | null>(null);

  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartBoxRef.current) return;
    const rect = chartBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setScrubX(x);
  };

  const handleChartMouseLeave = () => {
    setScrubX(null);
  };

  // 3D Card tilt state
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      rotateX: -y * 0.18,
      rotateY: x * 0.18,
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  const scroll = (direction: 'left' | 'right') => {
    sound.playClick();
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = 380;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1));
  };

  const scrollToIndex = (index: number) => {
    sound.playClick();
    if (!scrollRef.current) return;
    const itemWidth = 400;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const projects = [
    {
      id: 'solana-scrub-chart',
      title: 'Solana Scrub Chart',
      missionCode: 'MISSION #SOL-99',
      badge: 'Solana Ecosystem',
      category: 'Web3',
      description: 'High-frequency interactive token price scrubber built for Solana traders. Features sub-millisecond cursor tracking, momentum scrubbing, dynamic area fills, and live tooltip metrics.',
      stack: ['Solana', 'TypeScript', 'Canvas / SVG', 'Tailwind CSS'],
      github: 'https://github.com/alqamarzz/solana-scrub-chart',
      demo: 'https://solana-scrub-chart.vercel.app',
      color: '#00d2ff',
      icon: TrendingUp,
      type: 'chart',
    },
    {
      id: 'card-pieces-swipe-deck',
      title: 'Card Pieces Swipe Deck',
      missionCode: 'MISSION #SWIPE-07',
      badge: 'Fluid Gestures',
      category: 'Tactile UI',
      description: 'Physics-based multi-layered card swipe engine. Incorporates multi-touch dragging, velocity threshold releases, elastic spring recoil, and fragmented card-piece transitions.',
      stack: ['React', 'Framer Motion', 'Gesture API', 'TypeScript'],
      github: 'https://github.com/alqamarzz/card-pieces-swipe-deck',
      demo: 'https://card-pieces-swipe-deck.vercel.app',
      color: '#ef233c',
      icon: Layers,
      type: 'cards',
    },
    {
      id: 'bubble-navbar',
      title: 'Dynamic Bubble Pill Navbar',
      missionCode: 'MISSION #NAV-01',
      badge: 'Fluid Micro-Interaction',
      category: 'Tactile UI',
      description: 'Physics-driven dynamic floating pill navbar with spring-based magnetic hover bubbles, layoutId animated pill shifts, and dual-layer specular glassmorphism.',
      stack: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/alqamarzz/navbaar',
      demo: 'https://navbaar-two.vercel.app',
      color: '#38bdf8',
      icon: Navigation,
      type: 'navbar',
    },
    {
      id: 'credit-card-3d',
      title: '3D Skeuomorphic Credit Card',
      missionCode: 'MISSION #CARD-42',
      badge: '3D Simulation',
      category: 'Tactile UI',
      description: 'Tactile 3D banking card with real-time CVV flipping, dynamic holographic foil reflection mapped to mouse angle, chip specular glare, and synchronized form typing.',
      stack: ['React', 'CSS 3D Transforms', 'TypeScript', 'Tailwind'],
      github: 'https://github.com/alqamarzz/Credit_Card',
      demo: 'https://creditcard-five-phi.vercel.app',
      color: '#ffd166',
      icon: CreditCard,
      type: 'card3d',
    },
    {
      id: 'swipe-action-row',
      title: 'Tactile Swipe Action Row',
      missionCode: 'MISSION #ROW-19',
      badge: 'Component Kit',
      category: 'Systems',
      description: 'Mobile-first swipe-to-reveal row action component mimicking native iOS/Android lists. Engineered with rubber-banding resistance, haptic ticks, and action triggers.',
      stack: ['React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/alqamarzz/swipe-action-row',
      demo: 'https://swipe-action-row.vercel.app',
      color: '#a855f7',
      icon: MoveRight,
      type: 'swipe',
    },
    {
      id: 'solana-ecosystem-tracker',
      title: 'Solana Telemetry Oracle',
      missionCode: 'MISSION #ORACLE-24',
      badge: 'Automated CI/CD',
      category: 'Web3 / Automation',
      description: 'Automated daily time-series telemetry engine tracking Solana Mainnet TPS, DeFi TVL, price volatility, and epoch metrics via scheduled GitHub Actions Git-scraping.',
      stack: ['GitHub Actions', 'Solana RPC', 'TypeScript', 'DeFiLlama API', 'Cron'],
      github: 'https://github.com/alqamarzz/solana-ecosystem-tracker',
      demo: 'https://github.com/alqamarzz/solana-ecosystem-tracker#readme',
      color: '#14F195',
      icon: Activity,
      type: 'oracle',
    },
  ];

  return (
    <section id="projects" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Spider-Web Background Accent */}
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#ef233c]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-tech mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Classified Missions · Tactile Labs</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-inherit">Shipped </span><span className="text-[#ef233c] font-comic">Missions</span> & Craft
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-2">
            Interactive micro-interaction specimens and tactile systems engineered with spring physics and 60fps polish.
          </p>
        </div>

        {/* Carousel Motion Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs font-mono-tech text-zinc-500 hidden sm:inline">
            SWIPE OR NAVIGATE
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full glass-hud border border-white/10 hover:border-[#ef233c] text-zinc-300 hover:text-white transition active:scale-90 cursor-pointer shadow-sm"
              title="Previous Mission"
              aria-label="Previous Mission"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full glass-hud border border-white/10 hover:border-[#ef233c] text-zinc-300 hover:text-white transition active:scale-90 cursor-pointer shadow-sm"
              title="Next Mission"
              aria-label="Next Mission"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects One-Line Motion Track */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory px-1"
      >
        {projects.map((project, idx) => {
          const Icon = project.icon;

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="w-[85vw] sm:w-[380px] md:w-[410px] shrink-0 snap-center rounded-2xl glass-hud border border-white/10 hover:border-[#ef233c]/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_36px_rgba(239,35,60,0.15)] relative overflow-hidden group"
            >
              <div>
                {/* Top Mission Tag & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-comic text-xs tracking-wider text-[#ef233c] uppercase">
                    {project.missionCode}
                  </span>
                  <span className="text-[11px] font-mono-tech px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {project.badge}
                  </span>
                </div>

                {/* Interactive Visual Preview Box */}
                <div 
                  className="w-full h-44 rounded-xl bg-gradient-to-b from-[#141926] to-[#0a0d14] border border-white/5 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-white/15 transition-colors mb-5 cursor-crosshair"
                  style={{
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  <div className="absolute inset-0 spider-grid-pattern opacity-40 pointer-events-none" />

                  <div className="flex items-center justify-between z-10 pointer-events-none">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                      style={{ backgroundColor: `${project.color}20`, color: project.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono-tech text-zinc-400 uppercase">
                      Tactile Specimen
                    </span>
                  </div>

                  {/* Interactive Specimen Center */}
                  <div className="flex flex-col items-center justify-center my-auto z-10 w-full">
                    {/* Solana Interactive Scrubber */}
                    {project.type === 'chart' && (
                      <div 
                        ref={chartBoxRef}
                        onMouseMove={handleChartMouseMove}
                        onMouseLeave={handleChartMouseLeave}
                        className="w-full relative py-2"
                      >
                        <div className="flex items-center justify-between text-xs font-mono-tech mb-1 px-1">
                          <span className="text-zinc-300 font-semibold">SOL / USD</span>
                          <span className="text-emerald-400 font-bold">
                            {scrubX !== null 
                              ? `$${(175 + (scrubX / 200) * 15).toFixed(2)}` 
                              : '$184.25 (+8.4%)'}
                          </span>
                        </div>
                        <svg className="w-full h-14 text-[#00d2ff]" viewBox="0 0 200 40" fill="none">
                          <path
                            d="M0 32 Q 30 38, 60 20 T 120 15 T 160 5 T 200 12"
                            stroke="#00d2ff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M0 32 Q 30 38, 60 20 T 120 15 T 160 5 T 200 12 L 200 40 L 0 40 Z"
                            fill="url(#grad-chart-scrub)"
                            opacity="0.2"
                          />
                          {scrubX !== null && (
                            <line
                              x1={scrubX}
                              y1="0"
                              x2={scrubX}
                              y2="40"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeDasharray="2 2"
                            />
                          )}
                          <defs>
                            <linearGradient id="grad-chart-scrub" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00d2ff" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="text-[10px] text-zinc-500 font-mono-tech text-center mt-1">
                          Hover to scrub price points
                        </div>
                      </div>
                    )}

                    {/* Interactive Draggable Swipe Card */}
                    {project.type === 'cards' && (
                      <div className="relative w-36 h-24 flex items-center justify-center">
                        <div className="absolute w-24 h-16 rounded-xl bg-zinc-800 border border-white/10 -rotate-6 transform translate-y-1 opacity-60" />
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: -40, right: 40 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative w-28 h-16 rounded-xl bg-gradient-to-tr from-[#ef233c] to-[#990011] border border-white/20 shadow-xl flex flex-col items-center justify-center text-white cursor-grab active:cursor-grabbing select-none"
                        >
                          <span className="font-comic text-xs">SWIPE ME</span>
                          <span className="text-[9px] font-mono-tech opacity-80">Drag horizontally</span>
                        </motion.div>
                      </div>
                    )}

                    {/* Interactive 3D Perspective Card */}
                    {project.type === 'card3d' && (
                      <motion.div
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        animate={{
                          rotateX: cardTilt.rotateX,
                          rotateY: cardTilt.rotateY,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                        className="w-40 h-24 rounded-xl bg-gradient-to-tr from-zinc-900 via-amber-950/40 to-zinc-900 border border-amber-500/40 p-3 flex flex-col justify-between shadow-2xl relative select-none"
                      >
                        <div className="flex justify-between items-center">
                          <div className="w-5 h-3.5 rounded bg-gradient-to-r from-amber-400 to-amber-200 shadow-sm" />
                          <span className="font-comic text-[11px] text-amber-300">SPIDEY CARD</span>
                        </div>
                        <div className="font-mono-tech text-xs text-zinc-200 tracking-wider">
                          •••• 4242
                        </div>
                      </motion.div>
                    )}

                    {/* Swipe row preview */}
                    {project.type === 'swipe' && (
                      <div className="w-full max-w-[200px] h-11 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-between px-3 text-xs overflow-hidden">
                        <span className="text-zinc-300 font-mono-tech text-[11px]">Swipe Action</span>
                        <div className="px-2.5 py-1 rounded bg-[#a855f7] text-white text-[10px] font-bold shadow">
                          ARCHIVE
                        </div>
                      </div>
                    )}

                    {/* Interactive Bubble Navbar Specimen */}
                    {project.type === 'navbar' && (
                      <div className="w-full flex items-center justify-center py-2">
                        <div className="w-fit rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur-xl flex items-center gap-1 shadow-lg">
                          {['Home', 'Missions', 'Pulse'].map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setNavActiveTab(tab);
                              }}
                              className={`relative px-3 py-1 text-[11px] font-medium rounded-full transition-colors cursor-pointer select-none ${
                                navActiveTab === tab ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              {navActiveTab === tab && (
                                <motion.div
                                  layoutId="card-nav-bubble"
                                  className="absolute inset-0 rounded-full bg-white shadow-md"
                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                              )}
                              <span className="relative z-10">{tab}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Oracle Telemetry Preview */}
                    {project.type === 'oracle' && (
                      <div className="w-full text-left font-mono-tech text-[10px] bg-black/60 p-2.5 rounded-lg border border-[#14F195]/20 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400">TELEMETRY:</span>
                          <span className="text-[#14F195] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-ping" />
                            CRON 00:00 UTC
                          </span>
                        </div>
                        <div className="text-zinc-300 font-bold text-[11px] pt-0.5">
                          SOL: $121.10 · TVL: $6.73B · 4,427 TPS
                        </div>
                        <div className="text-zinc-500 text-[9px]">
                          DATA PIPELINE · 100% AUTOMATED GITHUB ACTION
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between z-10 text-[11px] font-mono-tech text-zinc-500 group-hover:text-zinc-300 transition-colors pointer-events-none">
                    <span>STATUS: OPERATIONAL</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ef233c] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Project Title & Description */}
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold group-hover:text-[#ef233c] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/5">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.07] text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      sound.playThwip();
                      triggerSpiderSense(`Launching ${project.title}`);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm hover:shadow-[0_0_12px_rgba(239,35,60,0.5)] cursor-pointer"
                    title={`Open live website: ${project.demo}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Indicator dots for the one line in motion */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i 
                ? 'w-8 bg-[#ef233c]' 
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            title={`Scroll to project ${i + 1}`}
            aria-label={`Scroll to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
