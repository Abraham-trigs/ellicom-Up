// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

const ACCESS_COOKIE = "token";
const REFRESH_COOKIE = "refresh_token";

export async function POST() {
  try {
    const res = NextResponse.json({ success: true, message: "Logged out successfully" });

    // Clear access token
    res.cookies.set(ACCESS_COOKIE, "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Clear refresh token
    res.cookies.set(REFRESH_COOKIE, "", {
      httpOnly: true,
      expires: new Date(0),
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
