"use client";

import { BadgeCheck, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChannelCardProps {
    id: string;
    name: string;
    thumbnail: string;
    subscribers: string;
    description: string;
    url: string;
    category: string;
    isVerified: boolean;
}

export function ChannelCard({
    name,
    thumbnail,
    subscribers,
    description,
    url,
    category,
    isVerified,
}: ChannelCardProps) {
    const handleClaimClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        alert("본인 인증 시스템 도입 준비 중입니다!");
    };

    return (
        <div className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:scale-[1.02] hover:border-zinc-600 hover:shadow-xl flex flex-col h-full">
            <Link href={url} target="_blank" rel="noopener noreferrer" className="block flex-1">
                {/* Thumbnail Area */}
                <div className="aspect-video relative w-full overflow-hidden bg-zinc-800">
                    <Image
                        src={thumbnail}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {category}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-white leading-tight flex items-center gap-1.5">
                            {name}
                            {isVerified && (
                                <BadgeCheck className="w-5 h-5 text-blue-500" fill="currentColor" color="white" />
                            )}
                        </h3>
                    </div>

                    <div className="flex items-center text-zinc-400 text-sm gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>구독자 {subscribers}</span>
                    </div>

                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed h-[2.5rem]">
                        {description}
                    </p>
                </div>
            </Link>

            {/* Footer / Action Area - separate from Link */}
            <div className="bg-zinc-950/50 p-3 border-t border-zinc-800 flex items-center justify-between mt-auto">
                {!isVerified ? (
                    <button
                        onClick={handleClaimClick}
                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-auto"
                    >
                        <User className="w-3 h-3" />
                        이 채널의 주인이신가요?
                    </button>
                ) : (
                    <div className="text-xs text-blue-500/80 ml-auto font-medium flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        공식 인증 채널
                    </div>
                )}
            </div>
        </div>
    );
}
