import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import { GithubIcon } from './Icons';
import {
  Server,
  ExternalLink,
  Bot,
  Zap,
  Lock,
  Layers,
  Database,
  Play,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Radio,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';

interface FullstackSectionProps {
  triggerSpiderSense: (msg?: string) => void;
  isEmbedded?: boolean;
}

interface FullstackProject {
  id: string;
  title: string;
  subtitle: string;
  missionCode: string;
  badge: string;
  tagline: string;
  description: string;
  accentColor: string;
  secondaryColor: string;
  github: string;
  demo?: string;
  videoSrc?: string;
  posterSrc?: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  architecture: {
    step1: { title: string; desc: string; icon: string };
    step2: { title: string; desc: string; icon: string };
    step3: { title: string; desc: string; icon: string };
  };
}

const FULLSTACK_PROJECTS: FullstackProject[] = [
  {
    id: 'nexus-chat',
    title: 'Nexus Chat',
    subtitle: 'Real-Time Communication & Gemini AI Platform',
    missionCode: 'MISSION #FS-NEXUS',
    badge: 'Real-Time WebSockets & AI',
    tagline:
      'High-performance fullstack messaging ecosystem with Google Gemini 1.5 Flash conversational intelligence, synchronized WebSockets, and Row Level Security.',
    description:
      'Architected for instantaneous sub-50ms synchronized messaging and conversational intelligence. Features 1-on-1 direct messages, group spaces, live typing indicators, presence tracking, emoji reactions, quoted replies, file uploads, and fine-grained PostgreSQL Row Level Security.',
    accentColor: '#38bdf8',
    secondaryColor: '#ef233c',
    github: 'https://github.com/alqamarzz/nexus-chat',
    demo: 'https://github.com/alqamarzz/nexus-chat',
    videoSrc: '/videos/nexus-chat.mp4',
    stack: [
      'Next.js 15 App Router',
      'TypeScript',
      'Supabase Realtime',
      'Google Gemini 1.5 Flash',
      'PostgreSQL RLS',
      'Tailwind CSS v4',
      'Zustand',
      'Framer Motion',
    ],
    metrics: [
      { label: 'WebSocket Latency', value: '<50ms' },
      { label: 'AI Model', value: 'Gemini 1.5 Flash' },
      { label: 'Security Layer', value: '100% RLS Protected' },
    ],
    highlights: [
      '⚡ Sub-50ms WebSocket Sync – Real-time message broadcast, live typing indicators, and user presence',
      '🤖 Nexus AI Assistant – Integrated Gemini 1.5 Flash companion for conversational insights & code generation',
      '🛡️ Fortified Row-Level Security – Fine-grained PostgreSQL RLS guarding private DMs, group channels & attachments',
      '✨ Dynamic Micro-Interactions – Contextual quote replies, emoji reactions, and fluid dark-mode themes',
    ],
    architecture: {
      step1: {
        title: 'Supabase Auth & RLS',
        desc: 'Email/Google OAuth + granular PostgreSQL policies',
        icon: 'lock',
      },
      step2: {
        title: 'Realtime WebSocket Mesh',
        desc: 'Bi-directional channels for instant messaging & presence',
        icon: 'radio',
      },
      step3: {
        title: 'Gemini 1.5 Flash AI Engine',
        desc: 'Streaming conversational responses and smart assistant',
        icon: 'bot',
      },
    },
  },
  {
    id: 'devtrack',
    title: 'DevTrack',
    subtitle: 'Fullstack Productivity & Task Management System',
    missionCode: 'MISSION #FS-DEVTRACK',
    badge: 'MERN Production CRUD',
    tagline:
      'Fullstack task management system with JWT authentication, MongoDB schema relations, dynamic productivity metrics, and custom filtering.',
    description:
      'Engineered with clean RESTful endpoints, secure bcrypt password hashing, and token-based session verification. Provides developers with real-time task lifecycle tracking, status breakdown charts, and a responsive interface.',
    accentColor: '#22c55e',
    secondaryColor: '#38bdf8',
    github: 'https://github.com/alqamarzz/todo_app',
    stack: [
      'MongoDB Atlas',
      'Express.js',
      'React',
      'Node.js',
      'JWT Authentication',
      'Tailwind CSS',
      'Axios',
    ],
    metrics: [
      { label: 'Auth Strategy', value: 'JWT + Bcrypt' },
      { label: 'Architecture', value: 'RESTful API' },
      { label: 'Database', value: 'MongoDB Mongoose' },
    ],
    highlights: [
      '🔑 JWT Session Authentication – Secure user registration, encrypted passwords, and protected API endpoints',
      '📊 Real-Time Productivity Metrics – Dynamic calculation of pending, in-progress, and completed states',
      '⚡ Zero-Lag CRUD Workflow – Instant state updates with optimized database queries and responsive UI',
      '🔍 Advanced Query Filters – Instant text search and status-based query filtering',
    ],
    architecture: {
      step1: {
        title: 'Bcrypt & JWT Auth Gate',
        desc: 'Secure token issuance and protected request headers',
        icon: 'lock',
      },
      step2: {
        title: 'Express REST Endpoints',
        desc: 'Modular controllers with robust error boundaries',
        icon: 'server',
      },
      step3: {
        title: 'MongoDB Schema Relations',
        desc: 'Indexed document storage with real-time status aggregations',
        icon: 'database',
      },
    },
  },
];

export const FullstackSection: React.FC<FullstackSectionProps> = ({ triggerSpiderSense, isEmbedded = false }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>('nexus-chat');
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  return (
    <div className={`relative ${isEmbedded ? 'py-4' : 'py-24'} px-4 max-w-6xl mx-auto overflow-hidden`}>
      {/* Background Glow Accents */}
      {!isEmbedded && (
        <>
          <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-1/3 -left-28 w-80 h-80 bg-[#ef233c]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        </>
      )}

      {/* ── Section Header (if standalone) or Compact Pill (if embedded) ── */}
      {!isEmbedded ? (
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#38bdf8]/15 via-[#ef233c]/15 to-[#22c55e]/15 border border-[#38bdf8]/30 text-xs font-mono-tech mb-4 uppercase tracking-wider"
          >
            <Server className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#ef233c]">
              Section 02 · Fullstack Systems
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Fullstack <span className="text-[#38bdf8] font-comic">Deployments</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed"
          >
            Production-grade fullstack web applications engineered with real-time WebSockets,
            Google Gemini AI models, relational databases with Row-Level Security, and scalable backend services.
          </motion.p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider font-semibold">
              2 Production Fullstack Applications · Nexus Chat & DevTrack
            </span>
          </div>
          <span className="text-xs font-mono-tech text-zinc-400 hidden sm:inline">
            Supabase Realtime · Gemini AI · MERN
          </span>
        </div>
      )}

      {/* ── Fullstack Projects Showcase ── */}
      <div className="space-y-12">
        {FULLSTACK_PROJECTS.map((project, idx) => {
          const isFlagship = project.id === 'nexus-chat';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.15 }}
              className="rounded-3xl glass-hud border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden relative shadow-2xl group"
            >
              {/* Decorative top accent sheen */}
              <div
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: project.accentColor }}
              />

              <div className="p-6 sm:p-8 lg:p-10">
                {/* ── Top Bar: Mission, Category Badge, Metrics ── */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-comic text-xs text-[#ef233c] uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-[#ef233c]/30 backdrop-blur-md">
                      {project.missionCode}
                    </span>
                    <span
                      className="text-xs font-mono-tech px-3 py-1 rounded-full bg-black/60 border font-semibold backdrop-blur-md"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}40`,
                        backgroundColor: `${project.accentColor}12`,
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* Quick Stat Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono-tech flex items-center gap-1.5"
                      >
                        <span className="text-zinc-500">{metric.label}:</span>
                        <span className="text-white font-semibold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Main Content Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Media Video / Animation Showcase (5 cols on lg) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#07080d] shadow-inner aspect-video sm:aspect-[16/10] flex items-center justify-center">
                      {project.videoSrc ? (
                        <video
                          ref={(el) => {
                            videoRefs.current[project.id] = el;
                          }}
                          src={project.videoSrc}
                          poster={project.posterSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                          style={{
                            background: `radial-gradient(circle at center, ${project.accentColor}1a 0%, #07080d 80%)`,
                          }}
                        >
                          <Database className="w-12 h-12 text-[#22c55e] mb-3 opacity-80" />
                          <h4 className="font-heading text-lg font-bold text-white mb-1">
                            RESTful MERN Architecture
                          </h4>
                          <p className="text-xs font-mono-tech text-zinc-400 max-w-xs">
                            MongoDB Atlas · Express.js · React · Node.js · JWT Session Engine
                          </p>
                        </div>
                      )}

                      {/* Overlay scanline effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Live Status indicator */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        <span className="text-[10px] font-mono-tech text-zinc-300 uppercase tracking-wider font-semibold">
                          Live Stack Active
                        </span>
                      </div>
                    </div>

                    {/* Architecture Protocol Visualizer */}
                    <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                      <div className="text-[10px] font-mono-tech uppercase text-zinc-400 tracking-wider mb-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
                          System Architecture Protocol
                        </span>
                        <span className="text-[#10b981] flex items-center gap-1 text-[10px]">
                          <Zap className="w-3 h-3" /> E2E Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                          <Lock className="w-4 h-4 text-[#38bdf8] mb-1.5 shrink-0" />
                          <span className="text-[11px] font-bold text-zinc-200 leading-tight">
                            {project.architecture.step1.title}
                          </span>
                          <span className="text-[9px] text-zinc-400 mt-1 line-clamp-2 leading-tight">
                            {project.architecture.step1.desc}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                          {isFlagship ? (
                            <Radio className="w-4 h-4 text-[#ef233c] mb-1.5 shrink-0" />
                          ) : (
                            <Server className="w-4 h-4 text-[#22c55e] mb-1.5 shrink-0" />
                          )}
                          <span className="text-[11px] font-bold text-zinc-200 leading-tight">
                            {project.architecture.step2.title}
                          </span>
                          <span className="text-[9px] text-zinc-400 mt-1 line-clamp-2 leading-tight">
                            {project.architecture.step2.desc}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                          {isFlagship ? (
                            <Bot className="w-4 h-4 text-[#38bdf8] mb-1.5 shrink-0" />
                          ) : (
                            <Database className="w-4 h-4 text-[#38bdf8] mb-1.5 shrink-0" />
                          )}
                          <span className="text-[11px] font-bold text-zinc-200 leading-tight">
                            {project.architecture.step3.title}
                          </span>
                          <span className="text-[9px] text-zinc-400 mt-1 line-clamp-2 leading-tight">
                            {project.architecture.step3.desc}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title, Details, Highlights, Stack & CTAs (7 cols on lg) */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      {/* Project Title & Subtitle */}
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white flex items-center gap-3">
                        <span>{project.title}</span>
                        {isFlagship && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] font-mono-tech uppercase tracking-wider font-semibold">
                            Flagship
                          </span>
                        )}
                      </h3>
                      <p
                        className="text-sm sm:text-base font-semibold mt-1 mb-3"
                        style={{ color: project.accentColor }}
                      >
                        {project.subtitle}
                      </p>

                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Key Engineering Highlights */}
                      <div className="space-y-2.5 mb-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                        <span className="text-[11px] font-mono-tech uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                          Core Fullstack Engineering Highlights:
                        </span>
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <span className="font-bold text-[#38bdf8] shrink-0">›</span>
                            <span className="leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="mb-6">
                        <span className="text-[11px] font-mono-tech uppercase text-zinc-400 tracking-wider block mb-2">
                          Engineered With:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono-tech px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-200 hover:border-white/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          sound.playThwip();
                          triggerSpiderSense(`Inspecting ${project.title} on GitHub`);
                        }}
                        className="flex-1 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Inspect Repository</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                      </a>

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            sound.playThwip();
                            triggerSpiderSense(`Launching ${project.title}`);
                          }}
                          className="py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer hover:brightness-110 shadow-lg"
                          style={{
                            backgroundColor: project.accentColor,
                            color: '#000',
                            boxShadow: `0 0 20px ${project.accentColor}40`,
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Project</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
