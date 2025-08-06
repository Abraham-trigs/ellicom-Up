// app/admin/invoice/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function InvoiceDetailPage({ params }: Props) {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: params.id,
    },
    include: {
      client: true, // assuming relation: invoice belongs to a user/client
    },
  });

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Invoice #{invoice.id}</h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Client:</span>{" "}
            {invoice.client?.name || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> $
            {invoice.amount.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {invoice.status}
          </p>
          <p>
            <span className="font-semibold">Issued:</span>{" "}
            {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Due:</span>{" "}
            {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
