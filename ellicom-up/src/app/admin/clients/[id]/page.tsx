import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function ClientDetailPage({ params }: Props) {
  const client = await prisma.user.findUnique({
    where: { id: params.id },
    include: { jobs: true },
  });

  if (!client || client.role !== "CLIENT") return notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/clients" className="text-sm text-gold hover:underline">
        ← Back to all clients
      </Link>

      <h1 className="text-2xl font-bold">{client.name}</h1>

      <p className="text-textSecondary">
        <strong>Email:</strong> {client.email}
        <br />
        <strong>Phone:</strong> {client.phone || "N/A"}
        <br />
        <strong>Joined:</strong>{" "}
        {new Date(client.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">🗂 Jobs Submitted</h2>
        {client.jobs.length === 0 ? (
          <p className="text-textMuted">No jobs found.</p>
        ) : (
          <ul className="space-y-2">
            {client.jobs.map((job) => (
              <li
                key={job.id}
                className="border border-border rounded-lg p-3 bg-surface"
              >
                <p className="text-white">{job.title}</p>
                <p className="text-sm text-textSecondary">{job.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
