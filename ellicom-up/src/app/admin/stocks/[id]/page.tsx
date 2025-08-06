// app/admin/stock/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function StockDetailPage({ params }: Props) {
  const stock = await prisma.stock.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!stock) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{stock.name}</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Quantity:</span> {stock.quantity}
          </p>
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {stock.category || "Uncategorized"}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {stock.status}
          </p>
          <p>
            <span className="font-semibold">Last Updated:</span>{" "}
            {new Date(stock.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
