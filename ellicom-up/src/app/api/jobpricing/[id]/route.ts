// app/api/jobpricing/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single pricing by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const pricing = await prisma.jobPricing.findUnique({
      where: { id: params.id },
    });
    if (!pricing) return NextResponse.json({ error: "JobPricing not found" }, { status: 404 });
    return NextResponse.json(pricing);
  } catch (err) {
    console.error("GET /api/jobpricing/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch job pricing" }, { status: 500 });
  }
}

// PATCH update pricing by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.jobPricing.update({
      where: { id: params.id },
      data: {
        jobType: body.jobType,
        materialType: body.materialType,
        variable: body.variable,
        unitPrice: body.unitPrice,
        modifiers: body.modifiers,
        notes: body.notes,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/jobpricing/[id] error:", err);
    return NextResponse.json({ error: "Failed to update job pricing" }, { status: 500 });
  }
}

// DELETE pricing by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.jobPricing.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "JobPricing deleted" });
  } catch (err) {
    console.error("DELETE /api/jobpricing/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete job pricing" }, { status: 500 });
  }
}
