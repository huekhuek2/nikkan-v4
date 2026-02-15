import { CategoryFilter } from "@/components/CategoryFilter";
import { ChannelCard } from "@/components/ChannelCard";
import { RegistrationForm } from "@/components/RegistrationForm";
import { EditChannelModal } from "@/components/EditChannelModal";
import { LoginButton } from "@/components/LoginButton";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Channel } from "@prisma/client";
import { auth } from "@/auth";

// Verified types with prisma generate

// Define Page Props for SearchParams (Server Component)
interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export const dynamic = "force-dynamic"; // Ensure fresh data

export default async function Home({ searchParams }: PageProps) {
  const session = await auth();
  const isAdmin = session?.user?.email === "01094838047a@gmail.com";

  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "all";

  // Fetch from DB
  let channels: Channel[] = [];
  try {
    channels = await prisma.channel.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    // Fail gracefully with empty list or separate error state
  }

  const filteredChannels = category === "all"
    ? channels
    : channels.filter(c => c.category === (
      category === "couple" ? "한일커플/부부" :
        category === "japan_life" ? "일본생활/브이로그" :
          category === "korea_life" ? "한국생활/브이로그" :
            category === "travel_food" ? "여행/음식" :
              category === "culture" ? "언어/문화" : ""
    ));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              NIKKAN
              <span className="block text-lg md:text-xl font-medium text-zinc-400 mt-2 tracking-normal">
                일한 크리에이터 & 인플루언서 큐레이션
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LoginButton session={session} />
            <div className="flex gap-3">
              <a
                href="https://open.kakao.com/o/s9M6o76g"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#FAE100] text-[#371D1E] font-bold text-sm hover:bg-[#FCE840] transition-transform hover:scale-105"
              >
                1:1 문의
              </a>
              <button className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-transform hover:scale-105 flex items-center gap-2">
                <Search className="w-4 h-4" />
                채널 찾기
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl py-2 -mx-4 px-4 md:mx-0 md:bg-transparent md:backdrop-blur-none transition-all">
          <div className="flex justify-center">
            <CategoryFilter />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {
            filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  {...channel}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-zinc-500">
                한일 관계의 모든 유튜버를 한눈에! 첫 번째 추천을 남겨주세요.
              </div>
            )
          }
        </div>

        <RegistrationForm />
        <EditChannelModal />
      </div>
    </main>
  );
}
