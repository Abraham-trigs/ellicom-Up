import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Public paths
const PUBLIC_PATHS = ["/login", "/signup", "/api"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public paths and static files
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
