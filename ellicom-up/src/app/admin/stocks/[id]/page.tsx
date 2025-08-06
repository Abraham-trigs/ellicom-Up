// app/admin/stock/[id]/page.tsx

export default function StockDetailPage() {
  // Static dummy stock data
  const stock = {
    name: "A4 Paper Pack",
    quantity: 42,
    category: "Office Supplies",
    status: "Available",
    updatedAt: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{stock.name}</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Quantity:</span> {stock.quantity}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {stock.category}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {stock.status}
          </p>
          <p>
            <span className="font-semibold">Last Updated:</span>{" "}
            {stock.updatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}
