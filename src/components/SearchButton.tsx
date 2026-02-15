"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    // Initialize query from URL
    useEffect(() => {
        setQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
            params.set("q", query.trim());
        } else {
            params.delete("q");
        }
        setIsOpen(false);
        router.push(`/?${params.toString()}`);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-transform hover:scale-105 flex items-center gap-2"
            >
                <Search className="w-4 h-4" />
                채널 찾기
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="채널명, 설명으로 검색..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 text-lg transition-all"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-400" />
                            </button>
                        </form>
                    </div>
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
                </div>
            )}
        </>
    );
}
