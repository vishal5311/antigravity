"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getAgentById } from "@/lib/agents";
import Image from "next/image";
import { useState, useEffect } from "react";

const VOICES = [
    "professional",
    "friendly",
    "calm",
    "energetic",
    "warm",
    "confident",
    "patient",
    "analytical",
    "knowledgeable",
];

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
];

export default function EditAgentPage() {
    const params = useParams();
    const router = useRouter();
    const agent = getAgentById(params.id as string);

    const [prompt, setPrompt] = useState("");
    const [voice, setVoice] = useState("");
    const [language, setLanguage] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (agent) {
            // Try to load from localStorage first
            const savedConfig = localStorage.getItem(`agent-config-${agent.id}`);
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                setPrompt(config.prompt);
                setVoice(config.voice);
                setLanguage(config.language);
            } else {
                setPrompt(agent.prompt);
                setVoice(agent.voice);
                setLanguage(agent.language);
            }
        }
    }, [agent]);

    if (!agent) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Agent Not Found</h1>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        const config = { prompt, voice, language };
        localStorage.setItem(`agent-config-${agent.id}`, JSON.stringify(config));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleReset = () => {
        setPrompt(agent.prompt);
        setVoice(agent.voice);
        setLanguage(agent.language);
        localStorage.removeItem(`agent-config-${agent.id}`);
    };

    const handlePreviewCall = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/session/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    avatar_key: agent.avatar_key,
                    prompt,
                    voice,
                    language,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create session");
            }

            const data = await response.json();
            window.open(data.session_url, "_blank");
        } catch (error: any) {
            console.error("Error starting preview:", error);
            alert(`Failed to start preview call: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back
                        </button>
                        <h1 className="text-5xl font-bold text-white mb-3">
                            Customize {agent.name}
                        </h1>
                        <p className="text-xl text-gray-400">
                            Personalize your agent's behavior and voice
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Preview */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-white/20 mb-4">
                                    <Image
                                        src={agent.image}
                                        alt={agent.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {agent.name}
                                        </h3>
                                        <p className="text-gray-300">{agent.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePreviewCall}
                                    disabled={isLoading}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {isLoading ? "Starting..." : "Preview Call"}
                                </button>
                            </div>
                        </div>

                        {/* Configuration Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* System Prompt */}
                            <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <label className="block text-lg font-bold text-white mb-3">
                                    System Prompt
                                </label>
                                <p className="text-sm text-gray-400 mb-4">
                                    Define how your agent behaves and responds to users
                                </p>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
                                    placeholder="Enter system prompt..."
                                />
                            </div>

                            {/* Voice Selection */}
                            <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <label className="block text-lg font-bold text-white mb-3">
                                    Voice
                                </label>
                                <p className="text-sm text-gray-400 mb-4">
                                    Choose the voice style for your agent
                                </p>
                                <select
                                    value={voice}
                                    onChange={(e) => setVoice(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 capitalize"
                                >
                                    {VOICES.map((v) => (
                                        <option key={v} value={v} className="bg-gray-900">
                                            {v}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Language Selection */}
                            <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <label className="block text-lg font-bold text-white mb-3">
                                    Language
                                </label>
                                <p className="text-sm text-gray-400 mb-4">
                                    Select the language for conversations
                                </p>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                >
                                    {LANGUAGES.map((lang) => (
                                        <option
                                            key={lang.code}
                                            value={lang.code}
                                            className="bg-gray-900"
                                        >
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                                >
                                    {isSaved ? "✓ Saved!" : "Save Changes"}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-medium hover:bg-white/20 transition-all hover:scale-105"
                                >
                                    Reset to Default
                                </button>
                            </div>

                            {/* Info Box */}
                            <div className="p-6 bg-blue-500/10 backdrop-blur-xl rounded-2xl border border-blue-500/20">
                                <div className="flex gap-3">
                                    <svg
                                        className="w-6 h-6 text-blue-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div>
                                        <h4 className="font-bold text-blue-400 mb-1">
                                            Configuration saved locally
                                        </h4>
                                        <p className="text-sm text-blue-300">
                                            Your customizations are stored in your browser's local
                                            storage. They will persist across sessions but won't sync
                                            across devices.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
