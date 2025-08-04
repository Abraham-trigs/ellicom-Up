import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function InvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      job: true,
    },
  });

  if (!invoice) return notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/invoices"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to invoices
      </Link>

      <div className="border border-border rounded-xl p-6 bg-surface space-y-4">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <p>
          <span className="text-textSecondary">Client:</span>{" "}
          {invoice.user.name}
        </p>
        <p>
          <span className="text-textSecondary">Email:</span>{" "}
          {invoice.user.email}
        </p>
        {invoice.job && (
          <p>
            <span className="text-textSecondary">Job:</span> {invoice.job.title}
          </p>
        )}
        <p>
          <span className="text-textSecondary">Amount:</span> GH₵{" "}
          {invoice.amount.toFixed(2)}
        </p>
        <p>
          <span className="text-textSecondary">Status:</span>{" "}
          <span className="capitalize">{invoice.status.toLowerCase()}</span>
        </p>
        <p className="text-sm text-muted">
          Issued on: {new Date(invoice.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
