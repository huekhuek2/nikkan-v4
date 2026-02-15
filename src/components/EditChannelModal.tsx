"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export function EditChannelModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        const handleOpen = (e: CustomEvent) => {
            const { id, name, category, description } = e.detail;
            setFormData({ id, name, category, description });
            setIsOpen(true);
        };

        window.addEventListener('openEditModal' as any, handleOpen as any);
        return () => window.removeEventListener('openEditModal' as any, handleOpen as any);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/channels/${formData.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: formData.category,
                    description: formData.description,
                }),
            });

            if (!res.ok) throw new Error("Failed to update");

            alert("수정되었습니다!");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("수정에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-1">채널 정보 수정</h2>
                <p className="text-zinc-400 text-sm mb-6 truncate">{formData.name}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                            카테고리
                        </label>
                        <select
                            required
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                        >
                            <option value="" disabled>카테고리를 선택해주세요</option>
                            {CATEGORIES.filter(c => c.id !== 'all').map((category) => (
                                <option key={category.id} value={category.label}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                            채널 설명 / 추천 이유
                        </label>
                        <textarea
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[100px] resize-none"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 px-4 py-3 rounded-lg font-medium text-zinc-400 hover:bg-zinc-800 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 rounded-lg font-medium bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    저장하기
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
