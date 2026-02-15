"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
    { id: "all", label: "전체" },
    { id: "couple", label: "한일커플/부부" },
    { id: "japan_life", label: "일본생활/브이로그" },
    { id: "korea_life", label: "한국생활/브이로그" },
    { id: "travel_food", label: "여행/음식" },
    { id: "culture", label: "언어/문화" },
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
