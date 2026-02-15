import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await request.json();
        const { category, description } = body;

        const updatedChannel = await prisma.channel.update({
            where: { id },
            data: {
                category,
                description,
            },
        });

        return NextResponse.json(updatedChannel);
    } catch (error) {
        console.error("Failed to update channel:", error);
        return NextResponse.json(
            { error: "Failed to update channel" },
            { status: 500 }
        );
    }
}
