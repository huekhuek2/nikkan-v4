import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function checkAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session?.user?.email || session.user.email !== adminEmail) {
    return false;
  }
  return true;
}

export function unauthorizedResponse() {
    return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
    );
}
