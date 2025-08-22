// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const ACCESS_COOKIE = "token";
const REFRESH_COOKIE = "refresh_token";

export type UserRole = "GUEST" | "SUPERADMIN" | "ADMIN" | "SECRETARY" | "STAFF" | "CLIENT";

type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

// milliseconds until next midnight
function msUntilMidnight() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0, 0
  );
  return nextMidnight.getTime() - now.getTime();
}

// Role-based redirects
const roleRedirects: Record<UserRole, string> = {
  GUEST: "/",
  SUPERADMIN: "/admin/dashboard",
  ADMIN: "/admin/dashboard",
  SECRETARY: "/secretary/dashboard",
  STAFF: "/staff/jobs",
  CLIENT: "/client/dashboard",
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

    const msUntilMid = msUntilMidnight();
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: Math.floor(msUntilMid / 1000) }
    );

    // Refresh token valid for 7 days
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser: SafeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    const redirectTo = roleRedirects[user.role];

    const res = NextResponse.json({ success: true, user: safeUser, token: accessToken, redirectTo });

    // Set cookies
    res.cookies.set(ACCESS_COOKIE, accessToken, {
      httpOnly: true,
      maxAge: Math.floor(msUntilMid / 1000),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.cookies.set(REFRESH_COOKIE, refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
