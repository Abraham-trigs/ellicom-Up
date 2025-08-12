import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default role CLIENT
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "CLIENT",
      },
    });

    return NextResponse.json({ message: "User created", userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error("[Signup Error]", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
