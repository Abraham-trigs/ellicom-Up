import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };

    const pathname = req.nextUrl.pathname;

    // Role-based access control
    if (pathname.startsWith("/dashboard/superadmin") && decoded.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/admin") && !["ADMIN", "SUPERADMIN"].includes(decoded.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/secretary") && decoded.role !== "SECRETARY") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/staff") && decoded.role !== "STAFF") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/client") && decoded.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Allow request if role matches
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Protect all dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
