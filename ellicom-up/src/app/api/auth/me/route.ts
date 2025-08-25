// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "token";

export async function GET() {
  try {
    const token = cookies().get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found in cookies" },
        { status: 401 }
      );
    }

    let payload: { id: string; email: string; role: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as typeof payload;
    } catch (err: any) {
      console.error("JWT verify failed:", err.message);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error("ME route error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
