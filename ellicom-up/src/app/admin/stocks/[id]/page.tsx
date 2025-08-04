import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function StockDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const stock = await prisma.stock.findUnique({
    where: { id: params.id },
  });

  if (!stock) return notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/stocks"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to stock list
      </Link>

      <div className="border border-border rounded-xl p-6 bg-surface space-y-4">
        <h1 className="text-2xl font-bold">{stock.name}</h1>
        <p>
          <span className="text-textSecondary">Quantity:</span> {stock.quantity}
        </p>
        <p>
          <span className="text-textSecondary">Unit:</span> {stock.unit}
        </p>
        <p>
          <span className="text-textSecondary">Status:</span>{" "}
          {stock.quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
        <p className="text-sm text-muted">
          Updated: {new Date(stock.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
