"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AGENTS } from "@/lib/agents";

export default function Home() {
  const featuredAgents = AGENTS.slice(0, 2);

  return (
    <div className="min-h-screen bg-black selection:bg-purple-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Live Backdrop */}
      <section className="relative min-h-[110vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mb-12 backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Beyond Presence Integrated</span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 uppercase italic">
            DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">HUMANS.</span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-700">
            Real-time, interactive video agents. Live animation. Ultra-low latency.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Link
              href="/agents"
              className="px-12 py-6 bg-white text-black rounded-[2rem] font-black text-xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.1)] uppercase tracking-tighter"
            >
              EXPLORE AGENTS
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section with Live Previews */}
      <section id="featured" className="relative py-48 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none italic">
              Live Animations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {featuredAgents.map((agent) => (
              <div
                key={agent.id}
                className="group relative bg-[#111] rounded-[3.5rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-purple-500/30 shadow-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <iframe
                    src={`https://bey.chat/${agent.avatar_key}`}
                    className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] pointer-events-none scale-150 transition-transform duration-700 group-hover:scale-160"
                    style={{ border: 'none' }}
                    allow="camera; microphone; fullscreen; autoplay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute bottom-12 left-12 pointer-events-none">
                    <h3 className="text-4xl font-black text-white mb-2 leading-none uppercase italic tracking-tighter">
                      {agent.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-green-500 font-black text-xs uppercase tracking-widest">{agent.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <Link
              href="/agents"
              className="group inline-flex items-center gap-4 text-white font-black text-2xl uppercase tracking-tighter hover:gap-6 transition-all italic underline decoration-purple-500 underline-offset-8"
            >
              View the full roster
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
          <p className="text-gray-700 font-black tracking-[0.5em] uppercase text-xs">
            &copy; 2026 MUONIUM AI &bull; ANAM AI POWERED
          </p>
        </div>
      </footer>
    </div>
  );
}
