"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function CallPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    // Cleanly extract the dynamic ID and build the session URL
    const [sessionUrl, setSessionUrl] = useState<string | null>(null)
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([])

    const recorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const recognitionRef = useRef<any>(null)

    const [isRecording, setIsRecording] = useState(false)
    const [recordingError, setRecordingError] = useState<string | null>(null)
    const [hasStarted, setHasStarted] = useState(false)
    const [isInitializing, setIsInitializing] = useState(false)

    /* -------------------------------------------------- */
    /* 🎤 LIVE TRANSCRIPT (user speech → text)            */
    /* -------------------------------------------------- */
    useEffect(() => {
        if (!hasStarted) return

        const SpeechRecognition =
            (window as any).webkitSpeechRecognition ||
            (window as any).SpeechRecognition

        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported")
            return
        }

        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = false

        recognition.onresult = (event: any) => {
            const text =
                event.results[event.results.length - 1][0].transcript

            setMessages((m: { role: string; text: string }[]) => [...m, { role: "User", text }])
        }

        try {
            recognition.start()
            recognitionRef.current = recognition
        } catch (e) {
            console.error("Speech recognition failed to start", e)
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop()
        }
    }, [hasStarted])

    /* -------------------------------------------------- */
    /* 🎥 VIDEO + AUDIO RECORDING TRIGGER                 */
    /* -------------------------------------------------- */
    async function startSession() {
        setIsInitializing(true)
        setRecordingError(null)

        try {
            // 1. Try to create a REAL session via our API
            let sessionData = null;
            try {
                const sessionResp = await fetch("/api/session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        avatar_id: id,
                        prompt: "Start interaction",
                        voice: "professional",
                        language: "en"
                    }),
                    // Add a shorter timeout for the fetch
                    signal: AbortSignal.timeout(5000)
                });

                if (sessionResp.ok) {
                    sessionData = await sessionResp.json();
                }
            } catch (apiErr) {
                console.warn("API Session creation failed, falling back to direct URL", apiErr);
            }

            // 2. Set Session URL (Prefer API returned URL, fallback to public bey.chat URL)
            const finalUrl = sessionData?.session_url || `https://bey.chat/${id}`;
            setSessionUrl(finalUrl);

            // 3. Request Microphone Access proactively
            // This grants permission to the parent domain so the iframe can inherit it
            try {
                const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                // Keep it for a moment then stop to release hardware but keep permission
                setTimeout(() => micStream.getTracks().forEach(track => track.stop()), 1000);
            } catch (micErr) {
                console.warn("Microphone permission denied", micErr);
                setRecordingError("Please allow microphone access for the AI to hear you.");
            }

            // 4. Initiate Meeting Recording (Optional)
            if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                try {
                    const displayStream = await navigator.mediaDevices.getDisplayMedia({
                        video: true,
                        audio: true,
                    });

                    if (typeof MediaRecorder !== 'undefined') {
                        const recorder = new MediaRecorder(displayStream, {
                            mimeType: "video/webm",
                        });

                        recorderRef.current = recorder
                        chunksRef.current = []
                        recorder.ondataavailable = (e: any) => {
                            if (e.data.size > 0) chunksRef.current.push(e.data)
                        }
                        recorder.start()
                        setIsRecording(true)
                        displayStream.getVideoTracks()[0].onended = () => stopRecording()
                    }
                } catch (recErr) {
                    console.warn("Recording declined", recErr);
                }
            }

            setHasStarted(true);
        } catch (err: any) {
            console.error("Initialization failed", err);
            setRecordingError(err.message || "Could not initialize session.");
        } finally {
            setIsInitializing(false);
        }
    }

    /* -------------------------------------------------- */
    /* 🛑 STOP + DOWNLOAD FILES                           */
    /* -------------------------------------------------- */
    function stopRecording() {
        const recorder = recorderRef.current
        if (!recorder || recorder.state === 'inactive') {
            router.push("/agents")
            return
        }

        recorder.stop()
        setIsRecording(false)

        recorder.onstop = () => {
            if (chunksRef.current.length > 0) {
                const blob = new Blob(chunksRef.current, { type: "video/webm" })
                download(blob, `meeting-${id}.webm`)
            }

            const transcriptText = messages
                .map((m: { role: string; text: string }) => `${m.role}: ${m.text}`)
                .join("\n")

            if (transcriptText) {
                const textBlob = new Blob([transcriptText], { type: "text/plain" })
                download(textBlob, `transcript-${id}.txt`)
            }

            router.push("/agents")
        }
    }

    function download(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 100)
    }

    return (
        <div className="flex h-screen bg-black text-white selection:bg-purple-500/30 font-sans overflow-hidden">
            {!hasStarted && (
                <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
                    <div className="max-w-md w-full p-12 text-center animate-in fade-in zoom-in duration-500">
                        {isInitializing ? (
                            <div className="space-y-8">
                                <div className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                <h2 className="text-2xl font-black uppercase tracking-widest text-white/50">Initializing AI...</h2>
                            </div>
                        ) : (
                            <>
                                <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/30">
                                    <div className="w-12 h-12 bg-red-600 rounded-full animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.5)]" />
                                </div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">Secure Session</h1>
                                <p className="text-gray-400 text-sm mb-10 leading-relaxed uppercase tracking-widest font-bold">
                                    Grant microphone access to start your interactive call.
                                </p>
                                <button
                                    onClick={startSession}
                                    className="w-full py-6 bg-white text-black font-black rounded-[2rem] shadow-2xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 uppercase tracking-tighter"
                                >
                                    Enter Live Session
                                </button>
                                <p className="mt-6 text-[8px] text-gray-600 uppercase tracking-widest font-black">Powered by Antigravity V1.0</p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* VIDEO AREA */}
            <div className="flex-1 relative group">
                {hasStarted && sessionUrl && (
                    <iframe
                        src={sessionUrl}
                        className="w-full h-full border-none"
                        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *; picture-in-picture *; clipboard-write *; speaker-selection *;"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                )}

                <div className="absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4">
                    <button
                        onClick={stopRecording}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-2xl border border-white/10"
                    >
                        End Call
                    </button>
                    {isRecording && (
                        <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-red-500/30 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-red-500">Rec Active</span>
                        </div>
                    )}
                </div>

                {recordingError && (
                    <div className="absolute top-20 left-6 z-10 px-6 py-4 bg-red-500/20 border border-red-500/40 rounded-2xl backdrop-blur-xl animate-in slide-in-from-left duration-300">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                            <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px]">!</span>
                            {recordingError}
                        </p>
                    </div>
                )}
            </div>


            {/* TRANSCRIPT PANEL */}
            <div className="w-96 bg-[#0a0a0a] border-l border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Live Intel</h2>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                            <div className="w-8 h-8 border-2 border-white/10 border-t-purple-500 rounded-full animate-spin mb-4" />
                            <p className="text-[8px] uppercase tracking-[0.2em] font-bold">Awaiting Data...</p>
                        </div>
                    )}
                    {messages.map((m: { role: string; text: string }, i: number) => (
                        <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-500">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[7px] font-black uppercase tracking-tighter text-purple-400">
                                    {m.role}
                                </span>
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </div>
                            <p className="px-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-[11px] text-gray-300 leading-relaxed italic">
                                {m.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-black/20">
                    <p className="text-[7px] font-black uppercase tracking-[0.4em] text-gray-800 text-center">Antigravity V1.0</p>
                </div>
            </div>

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    )
}

