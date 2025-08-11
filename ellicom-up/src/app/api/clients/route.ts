// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prisma'

// GET: Fetch all users with CLIENT role
export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
    })
    return NextResponse.json(clients)
  } catch (error) {
    console.error('[GET /api/clients]', error)
    return new NextResponse('Failed to fetch clients', { status: 500 })
  }
}

// POST: Create a new client (user with CLIENT role)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const newClient = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: 'CLIENT',
        // Add default password or handle separately if needed
      },
    })

    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    console.error('[POST /api/clients]', error)
    return new NextResponse('Failed to create client', { status: 500 })
  }
}

// PATCH: Update a client
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email, phone } = body;

    const updatedClient = await prisma.user.update({
      where: { id },
      data: { name, email, phone },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error('[PATCH /api/clients]', error);
    return new NextResponse('Failed to update client', { status: 500 });
  }
}

// DELETE: Remove a client
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    await prisma.user.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[DELETE /api/clients]', error);
    return new NextResponse('Failed to delete client', { status: 500 });
  }
}
