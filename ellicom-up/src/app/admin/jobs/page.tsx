import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { JobStatus } from "@prisma/client";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    include: {
      user: true,
      client: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📂 All Jobs</h1>

      <ul className="space-y-4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.id}`} className="block">
            <li className="border border-border rounded-xl p-4 bg-surface text-white hover:bg-border transition">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{job.title}</h2>
                  <p className="text-textSecondary text-sm">
                    Type: {job.type} · Submitted by:{" "}
                    {job.user?.name || job.client?.name || "Unknown"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
