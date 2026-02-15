import { CategoryFilter } from "@/components/CategoryFilter";
import { ChannelCard } from "@/components/ChannelCard";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Search } from "lucide-react";

// Mock Data for initial display
const MOCK_CHANNELS = [
  {
    id: "1",
    name: "토모토모TomoTomo",
    thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_kXy5y5y5y5y5y5y5y5y5y5y5y5y5y5=s900-c-k-c0x00ffffff-no-rj",
    subscribers: "108만명",
    description: "한국인 남자친구 유인과 일본인 여자친구 토모의 한일커플 일상 브이로그",
    url: "https://www.youtube.com/@TomoTomo",
    category: "한일커플",
    isVerified: true,
  },
  {
    id: "2",
    name: "Jin & Hattie 진과 해티",
    thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_n_G_G_G_G_G_G_G_G_G_G_G_G_G_G_=s900-c-k-c0x00ffffff-no-rj",
    subscribers: "180만명",
    description: "한국 남자 진과 영국 여자 해티의 국제커플 리얼 라이프",
    url: "https://www.youtube.com/@JinHattie",
    category: "국제부부",
    isVerified: true,
  },
  {
    id: "3",
    name: "카오루 TV",
    thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_p_p_p_p_p_p_p_p_p_p_p_p_p_p_p_=s900-c-k-c0x00ffffff-no-rj",
    subscribers: "89만명",
    description: "일본인 카오루의 한국 먹방 및 일상",
    url: "https://www.youtube.com/@KaoruTV",
    category: "여행/브이로그",
    isVerified: true,
  },
  {
    id: "4",
    name: "유이뿅 Yuipyon",
    thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_q_q_q_q_q_q_q_q_q_q_q_q_q_q_q_=s900-c-k-c0x00ffffff-no-rj",
    subscribers: "62만명",
    description: "한국을 너무 사랑하는 일본인 크리에이터 유이뿅입니다.",
    url: "https://www.youtube.com/@yuipyon",
    category: "일본취업/일상",
    isVerified: false,
  },
  {
    id: "5",
    name: "마츠다 부장",
    thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_r_r_r_r_r_r_r_r_r_r_r_r_r_r_r_=s900-c-k-c0x00ffffff-no-rj",
    subscribers: "110만명",
    description: "오사카에 사는 남자 TV. 일본 회사원의 리얼한 일상.",
    url: "https://www.youtube.com/@osakamatsuda",
    category: "일본취업/일상",
    isVerified: false,
  },
  {
    id: "6",
    name: "사쿠라 메모리즈",
    thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_s_s_s_s_s_s_s_s_s_s_s_s_s_s_s_=s900-c-k-c0x00ffffff-no-rj",
    subscribers: "45만명",
    description: "한일부부의 좌충우돌 육아 일기",
    url: "https://www.youtube.com/@sakuramemories",
    category: "한일커플",
    isVerified: false,
  },
];

// Define Page Props for SearchParams (Server Component)
interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "all";

  const filteredChannels = category === "all"
    ? MOCK_CHANNELS
    : MOCK_CHANNELS.filter(c => c.category === (
      category === "international" ? "국제부부" :
        category === "korea-japan" ? "한일커플" :
          category === "vlog" ? "일본취업/일상" :
            category === "travel" ? "여행/브이로그" : ""
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
            NIKKAN
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light">
            한일 커플 & 유튜버 큐레이션
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
              해당 카테고리의 채널이 없습니다.
            </div>
          )}
        </div>

        <RegistrationForm />
      </div>
    </main>
  );
}
