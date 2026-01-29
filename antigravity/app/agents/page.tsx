"use client";

import Navbar from "@/components/Navbar";
import AgentCard from "@/components/AgentCard";
import { AGENTS } from "@/lib/agents";

export default function AgentsPage() {
    return (
        <div className="min-h-screen bg-black selection:bg-purple-500/30">
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="relative mb-20">
                        <div className="absolute -left-12 -top-12 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />

                        <div className="relative">
                            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                                Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Video Agents</span>
                            </h1>
                            <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                                    Engage with world-class AI personalities through high-fidelity, real-time video conversations.
                                </p>
                                <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                                    <div className="flex -space-x-3">
                                        {AGENTS.map((a, i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-zinc-800">
                                                <img src={a.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pl-4 border-l border-white/10">
                                        <p className="text-sm font-bold text-white uppercase tracking-widest">{AGENTS.length} AGENTS ONLINE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Agents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {AGENTS.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))}
                    </div>

                    {/* Features Footer */}
                    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Ultra Low Latency", desc: "Real-time responses for natural human conversation." },
                            { title: "HD Video Quality", desc: "Beyond Presence powered high-fidelity digital humans." },
                            { title: "Global Scale", desc: "Available 24/7 across all time zones and devices." }
                        ].map((f, i) => (
                            <div key={i} className="p-8 bg-[#111] rounded-3xl border border-white/5">
                                <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">{f.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Minimal Footer */}
            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-gray-600 font-medium tracking-wide">
                    &copy; 2026 ANTIGRAVITY AI. ALL RIGHTS RESERVED.
                </p>
            </footer>
        </div>
    );
}
