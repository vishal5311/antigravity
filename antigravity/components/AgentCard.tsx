"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Agent {
    id: string;
    avatar_key: string;
    name: string;
    role: string;
    image: string;
}

interface AgentCardProps {
    agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleJoinCall = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/call/${agent.avatar_key}`);
    };

    return (
        <div
            className={`group relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-purple-500/30 hover:shadow-[0_0_80px_rgba(168,85,247,0.1)]`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 
                LIVE ANIMATED PREVIEW:
                Restoring the iframe animation from the previous version as requested.
                We use transform-scale and negative margins to center only the face/animation.
            */}
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                <iframe
                    src={`https://bey.chat/${agent.avatar_key}`}
                    className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] pointer-events-none scale-125 transition-all duration-1000 group-hover:scale-135"
                    style={{ border: 'none' }}
                    allow="camera; microphone; fullscreen; autoplay"
                />

                {/* Immersive Overlay Gradients */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 pointer-events-none" />

                {/* Interaction Actions */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${isHovered ? "opacity-100 backdrop-blur-[2px]" : "opacity-0 pointer-events-none"}`}>
                    <button
                        onClick={handleJoinCall}
                        className="px-10 py-5 bg-white text-black font-black rounded-3xl shadow-2xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3 uppercase tracking-tighter"
                    >
                        <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
                        Join Call
                    </button>
                    <button
                        onClick={() => router.push(`/agents/${agent.id}`)}
                        className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all uppercase text-xs"
                    >
                        View Profile
                    </button>
                </div>

                {/* Agent Identity Banner */}
                <div className="absolute inset-x-0 bottom-0 p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-3">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Live Now</span>
                            </div>
                            <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-1 uppercase italic">{agent.name}</h3>
                            <p className="text-purple-400 font-bold text-xs uppercase tracking-widest leading-none">{agent.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
