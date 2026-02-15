"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
    { id: "all", label: "전체" },
    { id: "international", label: "국제부부" },
    { id: "korea-japan", label: "한일커플" },
    { id: "vlog", label: "일본취업/일상" },
    { id: "travel", label: "여행/브이로그" },
];

export function CategoryFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentCategory = searchParams.get("category") || "all";

    const handleCategoryClick = (categoryId: string) => {
        const params = new URLSearchParams(searchParams);
        if (categoryId === "all") {
            params.delete("category");
        } else {
            params.set("category", categoryId);
        }
        router.replace(`/?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2 py-6 overflow-x-auto no-scrollbar justify-center">
            {CATEGORIES.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={cn(
                        "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border",
                        currentCategory === category.id
                            ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-105"
                            : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
                    )}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
