import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    return NextResponse.json({
      user: { id: decoded.id, email: decoded.email, role: decoded.role },
    });
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
