// app/api/team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';
import { Role } from '@prisma/client';

const TEAM_ROLES: Role[] = ['ADMIN', 'SECRETARY', 'STAFF'];

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: { in: TEAM_ROLES } },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('[GET /api/team]', error);
    return new NextResponse('Failed to fetch team', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, role } = body;

    const newUser = await prisma.user.create({
      data: { name, email, phone, role },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('[POST /api/team]', error);
    return new NextResponse('Failed to create team member', { status: 500 });
  }
}
