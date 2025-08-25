// app/api/jobpricing/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all job pricings
export async function GET() {
  try {
    const pricings = await prisma.jobPricing.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pricings);
  } catch (err) {
    console.error("GET /api/jobpricing error:", err);
    return NextResponse.json({ error: "Failed to fetch job pricings" }, { status: 500 });
  }
}

// POST create new job pricing
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pricing = await prisma.jobPricing.create({
      data: {
        jobType: body.jobType,
        materialType: body.materialType,
        variable: body.variable,
        unitPrice: body.unitPrice,
        modifiers: body.modifiers || [],
        notes: body.notes,
      },
    });
    return NextResponse.json(pricing, { status: 201 });
  } catch (err) {
    console.error("POST /api/jobpricing error:", err);
    return NextResponse.json({ error: "Failed to create job pricing" }, { status: 500 });
  }
}
