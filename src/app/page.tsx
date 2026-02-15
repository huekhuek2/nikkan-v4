import { CategoryFilter } from "@/components/CategoryFilter";
import { ChannelCard } from "@/components/ChannelCard";
import { RegistrationForm } from "@/components/RegistrationForm";
import { EditChannelModal } from "@/components/EditChannelModal";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Channel } from "@prisma/client";

// Verified types with prisma generate

// Define Page Props for SearchParams (Server Component)
interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export const dynamic = "force-dynamic"; // Ensure fresh data

export default async function Home({ searchParams }: PageProps) {
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
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            한일/日韓
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light">
            한일 / 日韓 YouTuber 큐레이션
          </p>

          {/* Search Bar Placeholder */}
          <div className="max-w-md mx-auto mt-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-3 backdrop-blur-xl">
              <Search className="w-5 h-5 text-zinc-500 mr-2" />
              <input
                type="text"
                placeholder="좋아하는 유튜버를 찾아보세요..."
                className="bg-transparent border-none outline-none text-white placeholder:text-zinc-600 w-full"
              />
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl py-2 -mx-4 px-4 md:mx-0 md:bg-transparent md:backdrop-blur-none transition-all">
          <div className="flex justify-center">
            <CategoryFilter />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} {...channel} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-zinc-500">
              한일 관계의 모든 유튜버를 한눈에! 첫 번째 추천을 남겨주세요.
            </div>
          )}
        </div>

        <RegistrationForm />
        <EditChannelModal />
      </div>
    </main>
  );
}
