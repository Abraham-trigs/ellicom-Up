// app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/login/route";

function isAdmin(role: string) {
  return role === "ADMIN" || role === "SUPERADMIN";
}

// GET: Fetch clients
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  if (isAdmin(session.user.role)) {
    const clients = await prisma.user.findMany({
      where: { role: "CLIENT" },
    });
    return NextResponse.json(clients);
  }

  if (session.user.role === "CLIENT") {
    const client = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!client) return new NextResponse("Not found", { status: 404 });
    return NextResponse.json(client);
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// POST: Create client (Admins only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdmin(session.user.role))
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
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { id, name, email, phone } = body;

    // Allow admins or owner only
    if (!isAdmin(session.user.role) && session.user.id !== id) {
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
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { id } = body;

    if (!isAdmin(session.user.role) && session.user.id !== id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.user.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/clients]", error);
    return new NextResponse("Failed to delete client", { status: 500 });
  }
}
