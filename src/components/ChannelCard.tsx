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
    isAdmin?: boolean;
}

export function ChannelCard({
    id,
    name,
    thumbnail,
    subscribers,
    description,
    url,
    category,
    isVerified,
    isAdmin,
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

                    {/* Removed Subscriber Count as per request */}

                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed h-[3rem]">
                        {description}
                    </p>
                </div>
            </Link>

            {/* Footer / Action Area - separate from Link */}
            <div className="bg-zinc-950/50 p-3 border-t border-zinc-800 flex items-center justify-between mt-auto">
                {isAdmin && (
                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('openEditModal', { detail: { id, name, category, description } }));
                            }}
                            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                        >
                            <User className="w-3 h-3" />
                            정보 수정
                        </button>
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!confirm("정말 삭제하시겠습니까?")) return;

                                try {
                                    const res = await fetch(`/api/channels?id=${id}`, {
                                        method: "DELETE",
                                    });
                                    if (res.ok) {
                                        alert("삭제되었습니다.");
                                        window.location.reload(); // Simple reload to refresh list
                                    } else {
                                        alert("삭제 실패");
                                    }
                                } catch (error) {
                                    console.error("Delete failed", error);
                                    alert("삭제 중 오류가 발생했습니다.");
                                }
                            }}
                            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 transition-colors"
                        >
                            <User className="w-3 h-3" />
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
