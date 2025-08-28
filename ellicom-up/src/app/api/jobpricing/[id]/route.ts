import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET one job pricing by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pricing = await prisma.jobPricing.findUnique({
      where: { id: params.id },
    });
    if (!pricing) {
      return NextResponse.json({ error: "Job pricing not found" }, { status: 404 });
    }
    return NextResponse.json(pricing);
  } catch (err) {
    console.error("GET /api/jobpricing/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch job pricing" }, { status: 500 });
  }
}

// PUT update job pricing by id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = await prisma.jobPricing.update({
      where: { id: params.id },
      data: {
        jobType: body.jobType,
        materialType: body.materialType,
        variable: body.variable,
        unitPrice: body.unitPrice,
        modifiers: body.modifiers || [],
        notes: body.notes,
        colorOptions: body.colorOptions || ["Color", "Black"],
        sideOptions: body.sideOptions || ["Front", "Front & Back"],
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/jobpricing/[id] error:", err);
    return NextResponse.json({ error: "Failed to update job pricing" }, { status: 500 });
  }
}

// DELETE job pricing by id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jobPricing.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Job pricing deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/jobpricing/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete job pricing" }, { status: 500 });
  }
}
