import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { JobStatus } from "@prisma/client";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function JobDetailPage({ params }: Props) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!job) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <Link
          href="/admin/jobs"
          className="inline-block bg-sea text-white px-4 py-2 rounded hover:bg-darkSea transition"
        >
          ← Back to All Jobs
        </Link>
      </div>

      <div className="border border-border rounded-xl p-6 bg-surface text-white space-y-3">
        <p>
          <strong>Type:</strong> {job.type}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              job.status === JobStatus.COMPLETED
                ? "bg-green-600"
                : job.status === JobStatus.IN_PROGRESS
                ? "bg-yellow-600"
                : job.status === JobStatus.CANCELLED
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {job.status}
          </span>
        </p>
        <p>
          <strong>Submitted by:</strong> {job.user.name} ({job.user.email})
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(job.createdAt).toLocaleString("en-GB")}
        </p>
      </div>
    </div>
  );
}
