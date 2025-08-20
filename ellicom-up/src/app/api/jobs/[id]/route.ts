import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('[PUT /api/jobs/[id]]', error);
    return new NextResponse('Failed to update job', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.job.delete({
      where: { id: params.id },
    });

    return new NextResponse('Job deleted', { status: 200 });
  } catch (error) {
    console.error('[DELETE /api/jobs/[id]]', error);
    return new NextResponse('Failed to delete job', { status: 500 });
  }
}

