import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // We need to create this

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url, reason } = body;

        // Validate input
        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Attempt to save to DB if connection exists
        try {
            if (!process.env.DATABASE_URL) throw new Error("No DB");

            // This is where we would save to DB
            // const channel = await prisma.channel.create({ ... })
            console.log("DB Connection Mock - Would save:", { url, reason });
        } catch (e) {
            console.warn("DB not connected, skipping save");
        }

        return NextResponse.json({ success: true, message: "Registered (Mock)" });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Return mock data provided in the prompt for now if DB fails or is empty
    return NextResponse.json({
        channels: []
    });
}
