// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

const COOKIE_NAME = "token";

export async function POST() {
  try {
    const res = NextResponse.json({ success: true, message: "Logged out successfully" });

    // Clear the HttpOnly cookie
    res.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      expires: new Date(0), // immediately expires
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
