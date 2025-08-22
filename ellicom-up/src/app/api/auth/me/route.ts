// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "token";

export async function GET(req: Request) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
  }
}
