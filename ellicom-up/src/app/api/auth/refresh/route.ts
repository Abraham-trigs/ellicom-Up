// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const ACCESS_COOKIE = "token";
const REFRESH_COOKIE = "refresh_token";

export async function POST(req: Request) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;

    if (!refreshToken) {
      // No refresh token → tell frontend to logout
      return NextResponse.json({ success: false, message: "No refresh token", forceLogout: true }, { status: 401 });
    }

    let payload: { id: string; email: string; role: string };
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    } catch (err) {
      // Invalid or expired refresh token → force logout
      return NextResponse.json({ success: false, message: "Invalid refresh token", forceLogout: true }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found", forceLogout: true }, { status: 404 });
    }

    // Calculate milliseconds until next midnight
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: Math.floor(msUntilMidnight / 1000) }
    );

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: accessToken,
    });

    res.cookies.set(ACCESS_COOKIE, accessToken, {
      httpOnly: true,
      maxAge: Math.floor(msUntilMidnight / 1000),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    console.error(err);
    // Any unexpected error → force logout
    return NextResponse.json({ success: false, message: "Internal server error", forceLogout: true }, { status: 500 });
  }
}
