// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const includeRelations = {
  createdBy: { select: { id: true, name: true, email: true } },
  handledBy: { select: { id: true, name: true, email: true } },
  jobPricing: { select: { id: true, unitPrice: true, variable: true } },
};

// GET job by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: includeRelations,
    });
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json(job);
  } catch (err) {
    console.error("GET /api/jobs/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// PATCH update job
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const job = await prisma.job.update({
      where: { id: params.id },
      data: {
        jobType: body.jobType,
        details: body.details,
        status: body.status,
        handledById: body.handledById,
        jobPricingId: body.jobPricingId,
      },
      include: includeRelations,
    });
    return NextResponse.json(job);
  } catch (err) {
    console.error("PATCH /api/jobs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE job
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Job deleted" });
  } catch (err) {
    console.error("DELETE /api/jobs/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
