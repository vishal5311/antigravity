"use client";

interface VideoFrameProps {
    sessionUrl: string;
    onClose?: () => void;
}

export default function VideoFrame({ sessionUrl, onClose }: VideoFrameProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black">
            {/* Header with close button */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-white font-medium">Live Session</span>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-medium transition-all hover:scale-105"
                        >
                            End Call
                        </button>
                    )}
                </div>
            </div>

            {/* Video iframe */}
            <iframe
                src={sessionUrl}
                className="w-full h-full"
                allow="camera; microphone; fullscreen"
                allowFullScreen
            />
        </div>
    );
}
