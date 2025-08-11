// app/api/team/[id]/route.ts
import { prisma } from '@/lib/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await prisma.user.update({
      where: { id: params.id },
      data,
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PUT /api/team]', error);
    return new NextResponse('Failed to update user', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[DELETE /api/team]', error);
    return new NextResponse('Failed to delete user', { status: 500 });
  }
}
