// app/admin/job/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function JobDetailPage({ params }: Props) {
  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
    include: {
      createdBy: true,
      handledBy: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Status:</span> {job.status}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {job.details || "No details provided."}
          </p>
          <p>
            <span className="font-semibold">Created By:</span>{" "}
            {job.createdBy?.name || "Unknown"} ({job.createdBy?.role})
          </p>
          <p>
            <span className="font-semibold">Handled By:</span>{" "}
            {job.handledBy?.name || "Not assigned"}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
