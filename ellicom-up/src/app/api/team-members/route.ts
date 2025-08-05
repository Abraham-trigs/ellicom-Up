import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
export async function GET() {
  try {
    const teamMembers = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SECRETARY", "STAFF"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: teamMembers });
  } catch (error) {
    console.error("[GET_TEAM_MEMBERS_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team members." },
      { status: 500 }
    );
  }
}
