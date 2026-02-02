"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { getAgentById } from "@/lib/agents";

export default function AgentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const agent = getAgentById(params.id as string);

    if (!agent) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Navbar />
                <div className="text-center px-4">
                    <h1 className="text-4xl font-bold text-white mb-4 italic">Agent Not Found</h1>
                    <Link href="/agents" className="text-purple-400 hover:text-purple-300 font-black uppercase tracking-widest text-sm">
                        Back to Roster
                    </Link>
                </div>
            </div>
        );
    }

    const handleJoinCall = () => {
        router.push(`/call/${agent.avatar_key}`);
    };

    return (
        <div className="min-h-screen bg-black selection:bg-purple-500/30">
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Back button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-3 text-gray-500 hover:text-white mb-12 transition-all font-black uppercase text-xs tracking-[0.3em]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        Return to Dashboard
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* LIVE ANIMATED PREVIEW */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-purple-600/10 blur-[80px] rounded-full opacity-50" />
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
                                <iframe
                                    src={`https://bey.chat/${agent.avatar_key}`}
                                    className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] pointer-events-none scale-150"
                                    style={{ border: 'none' }}
                                    allow="camera; microphone; fullscreen; autoplay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                        </div>

                        {/* Agent Detailed Information */}
                        <div className="space-y-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live Now</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none mb-4 uppercase">
                                    {agent.name}
                                </h1>
                                <p className="text-2xl text-purple-400 font-bold uppercase tracking-tight">{agent.role}</p>
                            </div>

                            <p className="text-xl text-gray-400 leading-relaxed font-medium">
                                {agent.prompt}
                            </p>

                            <div className="flex flex-wrap gap-6 pt-8">
                                <button
                                    onClick={handleJoinCall}
                                    className="px-12 py-6 bg-white text-black rounded-3xl font-black text-xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.15)] flex items-center gap-4 uppercase tracking-tighter"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Start Video Call
                                </button>
                            </div>

                            {/* Tech Specs */}
                            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-white/5">
                                {[
                                    { label: "Latency", val: "< 500ms" },
                                    { label: "Resolution", val: "1080p HD" },
                                    { label: "Voice", val: "High Fidelity" },
                                    { label: "Provider", val: "Anam AI" }
                                ].map((spec, i) => (
                                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{spec.label}</p>
                                        <p className="text-white font-bold text-lg">{spec.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
