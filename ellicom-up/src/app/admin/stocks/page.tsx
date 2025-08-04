import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StocksPage() {
  const stocks = await prisma.stock.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stock Inventory</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-surface">
            <tr>
              <th className="text-left px-4 py-2">Item</th>
              <th className="text-left px-4 py-2">Quantity</th>
              <th className="text-left px-4 py-2">Unit</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Last Updated</th>
              <th className="text-left px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item) => (
              <tr
                key={item.id}
                className="border-t border-borderAlt hover:bg-surface/50 transition"
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.unit}</td>
                <td className="px-4 py-2 capitalize">
                  {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="px-4 py-2">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/stocks/${item.id}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stocks.length === 0 && (
          <p className="text-center text-sm text-textMuted mt-4">
            No stock items yet.
          </p>
        )}
      </div>
    </div>
  );
}
