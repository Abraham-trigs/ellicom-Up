import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      jobs: {
        orderBy: { createdAt: "desc" },
        take: 5, // show recent jobs
      },
      invoices: true,
    },
  });

  if (!client || client.role !== "CLIENT") return notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to all clients
      </Link>

      <div className="border border-border rounded-xl p-6 bg-surface">
        <h1 className="text-2xl font-bold mb-2">{client.name}</h1>
        <p className="text-textSecondary">{client.email}</p>
        {client.phone && <p className="text-textSecondary">{client.phone}</p>}
        <p className="text-sm text-muted mt-2">
          Joined: {new Date(client.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-3">Recent Jobs</h2>
          {client.jobs.length > 0 ? (
            <ul className="space-y-2">
              {client.jobs.map((job) => (
                <li
                  key={job.id}
                  className="flex justify-between items-center border-b border-borderAlt pb-2"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-textSecondary">
                      {job.status} • {job.type}
                    </p>
                  </div>
                  <Link
                    href={`/admin/jobs/${job.id}`}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    View →
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-textMuted">No jobs found.</p>
          )}
        </div>

        {/* Invoices */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-3">Invoices</h2>
          {client.invoices.length > 0 ? (
            <ul className="space-y-2">
              {client.invoices.map((invoice) => (
                <li
                  key={invoice.id}
                  className="flex justify-between items-center border-b border-borderAlt pb-2"
                >
                  <p>
                    GH₵ {invoice.amount.toFixed(2)}{" "}
                    <span className="text-xs text-textSecondary">
                      ({invoice.status})
                    </span>
                  </p>
                  <p className="text-xs text-textMuted">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-textMuted">No invoices found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
