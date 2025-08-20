// lib/prisma/jobPricing.ts
import { prisma } from "@/lib/prisma";

// ✅ CREATE
export async function createJobPricing(data: {
  jobType: string;
  materialType?: string;
  variable: string;
  unitPrice: number;
  modifiers?: string[];
  notes?: string;
}) {
  return await prisma.jobPricing.create({ data });
}

// ✅ READ (all)
export async function getAllJobPricings() {
  return await prisma.jobPricing.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// ✅ READ (by ID)
export async function getJobPricingById(id: string) {
  return await prisma.jobPricing.findUnique({
    where: { id },
  });
}

// ✅ UPDATE
export async function updateJobPricing(id: string, data: {
  jobType?: string;
  materialType?: string;
  variable?: string;
  unitPrice?: number;
  modifiers?: string[];
  notes?: string;
}) {
  return await prisma.jobPricing.update({
    where: { id },
    data,
  });
}

// ✅ DELETE
export async function deleteJobPricing(id: string) {
  return await prisma.jobPricing.delete({
    where: { id },
  });
}
