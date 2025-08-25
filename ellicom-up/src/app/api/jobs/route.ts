import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true, role: true } },
        handledBy: { select: { id: true, name: true, email: true, role: true } },
        jobPricing: { select: { id: true, jobType: true, materialType: true, unitPrice: true, variable: true, modifiers: true, notes: true } },
      },
    });

    // Map jobPricing → jobPrice and include unitPrice for convenience
    const jobsWithJobPrice = jobs.map(job => ({
      ...job,
      jobPrice: job.jobPricing ? { ...job.jobPricing } : null,
      unitPrice: job.jobPricing?.unitPrice ?? null,
    }));

    return NextResponse.json(jobsWithJobPrice);
  } catch (error) {
    console.error("[GET /api/jobs]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST create a new job
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobType, materialType, details, status, createdById, handledById } = body;

    // Find matching JobPricing
    const jobPricing = await prisma.jobPricing.findFirst({
      where: { jobType, materialType },
    });

    // Create the job with linked pricing
    const job = await prisma.job.create({
      data: {
        jobType,
        details,
        status,
        createdById,
        handledById,
        jobPricingId: jobPricing?.id,
      },
    });

    // Fetch the created job with relations
    const jobWithUsers = await prisma.job.findUnique({
      where: { id: job.id },
      include: {
        createdBy: { select: { id: true, name: true, email: true, role: true } },
        handledBy: { select: { id: true, name: true, email: true, role: true } },
        jobPricing: { select: { id: true, jobType: true, materialType: true, unitPrice: true, variable: true, modifiers: true, notes: true } },
      },
    });

    // Map pricing to jobPrice and include unitPrice
    const response = jobWithUsers
      ? {
          ...jobWithUsers,
          jobPrice: jobWithUsers.jobPricing ? { ...jobWithUsers.jobPricing } : null,
          unitPrice: jobWithUsers.jobPricing?.unitPrice ?? null,
        }
      : null;

    return NextResponse.json(response);
  } catch (error) {
    console.error("[POST /api/jobs]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
