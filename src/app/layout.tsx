import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIKKAN | 한일 크리에이터 & 인플루언서 큐레이션",
  description: "나만 알기 아까운 한일 유튜버와 인플루언서를 한눈에 확인하세요!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="py-8 text-center text-zinc-500 text-sm border-t border-zinc-900 mt-12">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/terms" className="hover:text-zinc-300 transition-colors">이용약관</a>
            <a href="/privacy" className="hover:text-zinc-300 transition-colors">개인정보처리방침</a>
          </div>
          <p>© 2024 NIKKAN. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
