import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as cheerio from "cheerio";

export async function GET() {
    try {
        const channels = await prisma.channel.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(channels);
    } catch (error) {
        console.error("Failed to fetch channels:", error);
        return NextResponse.json(
            { error: "Failed to fetch channels" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, reason } = body;

        if (!url) {
            return NextResponse.json(
                { error: "YouTube URL is required" },
                { status: 400 }
            );
        }

        // simplistic validation: just check if it contains "youtube" or "youtu.be"
        if (!url.includes("youtube") && !url.includes("youtu.be")) {
            return NextResponse.json(
                { error: "Invalid YouTube URL" },
                { status: 400 }
            );
        }

        // Scrape metadata
        let name = "Unknown Channel";
        let thumbnail = "https://picsum.photos/800/450"; // Fallback
        let description = reason || "No description provided.";
        let subscribers = "0";

        try {
            const response = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "Accept-Language": "en-US,en;q=0.9",
                }
            });
            const html = await response.text();
            const $ = cheerio.load(html);

            const ogTitle = $('meta[property="og:title"]').attr('content');
            const ogImage = $('meta[property="og:image"]').attr('content');
            const ogDesc = $('meta[property="og:description"]').attr('content');

            if (ogTitle) name = ogTitle;
            if (ogImage) thumbnail = ogImage;
            // User provided reason > ogDesc, usually. Or combine?
            // Let's use user reason if present, otherwise default to ogDesc or "No description".
            if (!reason && ogDesc) {
                description = ogDesc;
            }

        } catch (scrapeError) {
            console.error("Scraping failed:", scrapeError);
            // Continue with defaults
        }

        const newChannel = await prisma.channel.create({
            data: {
                name,
                url,
                thumbnail,
                description,
                subscribers, // We can't easily get this from og tags usually, needs API or regex on body. defaulting to 0.
                category: "미분류", // Default category
                isVerified: false,
            },
        });

        return NextResponse.json(newChannel);
    } catch (error) {
        console.error("Failed to create channel:", error);
        return NextResponse.json(
            { error: "Failed to create channel" },
            { status: 500 }
        );
    }
}
