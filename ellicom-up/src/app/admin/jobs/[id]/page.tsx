import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface JobDetailsProps {
  params: { id: string };
}

export default async function JobDetailsPage({ params }: JobDetailsProps) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      invoice: true, // if you set up reverse relation
    },
  });

  if (!job) return notFound();

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>

      <div className="bg-surface p-4 rounded-xl border border-border space-y-2">
        <p>
          <span className="text-textSecondary">Type:</span> {job.type}
        </p>
        <p>
          <span className="text-textSecondary">Status:</span> {job.status}
        </p>
        <p>
          <span className="text-textSecondary">Submitted by:</span>{" "}
          {job.user.name}
        </p>
        <p>
          <span className="text-textSecondary">Submitted on:</span>{" "}
          {new Date(job.createdAt).toLocaleString()}
        </p>
        {job.description && (
          <p>
            <span className="text-textSecondary">Description:</span>{" "}
            {job.description}
          </p>
        )}
        {job.invoice && (
          <div className="pt-4">
            <p className="font-semibold">💸 Invoice</p>
            <p>Status: {job.invoice.status}</p>
            <p>Amount: GH₵{job.invoice.amount.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
