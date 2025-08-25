// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const includeRelations = {
  createdBy: { select: { id: true, name: true, email: true } },
  handledBy: { select: { id: true, name: true, email: true } },
  jobPricing: { select: { id: true, unitPrice: true, variable: true } },
};

// GET all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({ include: includeRelations });
    return NextResponse.json(jobs);
  } catch (err) {
    console.error("GET /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST create new job
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const job = await prisma.job.create({
      data: {
        jobType: body.jobType,
        details: body.details,
        status: body.status,
        createdById: body.createdById,
        handledById: body.handledById,
        jobPricingId: body.jobPricingId,
      },
      include: includeRelations,
    });
    return NextResponse.json(job);
  } catch (err) {
    console.error("POST /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
