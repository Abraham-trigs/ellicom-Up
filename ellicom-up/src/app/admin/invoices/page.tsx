import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      user: true,
      job: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-surface">
            <tr>
              <th className="text-left px-4 py-2">Client</th>
              <th className="text-left px-4 py-2">Job</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-t border-borderAlt hover:bg-surface/50 transition"
              >
                <td className="px-4 py-2">{invoice.user.name}</td>
                <td className="px-4 py-2">{invoice.job?.title}</td>
                <td className="px-4 py-2">GH₵ {invoice.amount.toFixed(2)}</td>
                <td className="px-4 py-2 capitalize">
                  {invoice.status.toLowerCase()}
                </td>
                <td className="px-4 py-2">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/invoices/${invoice.id}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <p className="text-center text-sm text-textMuted mt-4">
            No invoices yet.
          </p>
        )}
      </div>
    </div>
  );
}
