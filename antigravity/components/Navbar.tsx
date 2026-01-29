"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <span className="text-white font-bold text-xl">Antigravity</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/agents"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Agents
                        </Link>
                        <Link
                            href="/#features"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/agents"
                            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                        >
                            Try Now
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            href="/agents"
                            className="block text-gray-300 hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Agents
                        </Link>
                        <Link
                            href="/#features"
                            className="block text-gray-300 hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/agents"
                            className="block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Try Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
