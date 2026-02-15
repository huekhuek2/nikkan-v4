"use client";

import { useState } from "react";
import { Loader2, Plus, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function RegistrationForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        url: "",
        reason: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/channels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to register");

            alert("채널이 등록되었습니다!");
            setIsOpen(false);
            setFormData({ url: "", reason: "" });
            router.refresh(); // Refresh server components
        } catch (error) {
            console.error(error);
            alert("등록에 실패했습니다. URL을 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 rounded-full bg-white text-black p-4 shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
            >
                <Plus className="w-6 h-6" />
                <span className="sr-only">채널 추천하기</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold mb-2">유튜버 추천하기</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            나만 알기 아까운 한일 국제부부/커플 유튜버를 추천해주세요!
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">
                                    유튜브 채널 링크
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="https://youtube.com/@..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                    value={formData.url}
                                    onChange={(e) =>
                                        setFormData({ ...formData, url: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">
                                    추천 이유 (선택)
                                </label>
                                <textarea
                                    placeholder="이 채널의 매력 포인트는 무엇인가요?"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[100px] resize-none"
                                    value={formData.reason}
                                    onChange={(e) =>
                                        setFormData({ ...formData, reason: e.target.value })
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
                                            <Send className="w-4 h-4" />
                                            등록하기
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
