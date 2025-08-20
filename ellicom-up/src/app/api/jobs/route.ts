import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        handledBy: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('[GET /api/jobs]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, details, type, status, createdById, handledById } = body;

    const job = await prisma.job.create({
      data: {
        title,
        details,
        type,
        status,
        createdById,
        handledById,
      },
    });

    // To return createdBy and handledBy objects after creation,
    // fetch the job with relations again or include them if possible
    const jobWithUsers = await prisma.job.findUnique({
      where: { id: job.id },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        handledBy: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(jobWithUsers);
  } catch (error) {
    console.error('[POST /api/jobs]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
