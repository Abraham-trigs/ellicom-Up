// src/app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

function isAdmin(role: string) {
  return role === "ADMIN" || role === "SUPERADMIN";
}

// --- helper to extract user from request (using JWT cookie) ---
async function getUserFromRequest(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    return decoded;
  } catch {
    return null;
  }
}

// GET: Fetch clients
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  if (isAdmin(user.role)) {
    const clients = await prisma.user.findMany({
      where: { role: "CLIENT" },
    });
    return NextResponse.json(clients);
  }

  if (user.role === "CLIENT") {
    const client = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!client) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(client);
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// POST: Create client (Admins only)
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user.role))
    return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const newClient = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: "CLIENT",
      },
    });
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("[POST /api/clients]", error);
    return new NextResponse("Failed to create client", { status: 500 });
  }
}

// PATCH: Update client (Admins or owner)
export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { id, name, email, phone } = body;

    // Allow admins or owner only
    if (!isAdmin(user.role) && user.id !== id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedClient = await prisma.user.update({
      where: { id },
      data: { name, email, phone },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("[PATCH /api/clients]", error);
    return new NextResponse("Failed to update client", { status: 500 });
  }
}

// DELETE: Remove client (Admins or owner)
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { id } = body;

    if (!isAdmin(user.role) && user.id !== id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.user.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/clients]", error);
    return new NextResponse("Failed to delete client", { status: 500 });
  }
}
