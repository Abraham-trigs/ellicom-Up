// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "token";

export type UserRole = "GUEST" | "SUPERADMIN" | "ADMIN" | "SECRETARY" | "STAFF" | "CLIENT";

type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

// Helper: milliseconds until next midnight
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

// Dynamic redirect paths for all roles
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

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const expiresInMs = msUntilMidnight();
    const expiresInSec = Math.floor(expiresInMs / 1000);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: expiresInSec }
    );

    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };

    const redirectTo = roleRedirects[user.role];

    const res = NextResponse.json({
      success: true,
      user: safeUser,
      token,
      redirectTo,
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: expiresInSec,
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
