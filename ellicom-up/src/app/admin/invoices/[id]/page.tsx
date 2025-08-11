// app/admin/invoice/[id]/page.tsx

export default function InvoiceDetailPage() {
  // Dummy invoice details
  const invoice = {
    id: "INV-2025-001",
    client: "John Doe",
    email: "john@example.com",
    dateIssued: new Date().toLocaleDateString(),
    total: 4500.0,
    status: "Paid",
    items: [
      { description: "Logo Design", amount: 1500 },
      { description: "Landing Page", amount: 3000 },
    ],
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Invoice #{invoice.id}</h1>

        <div className="space-y-2 text-gray-700 mb-8">
          <p>
            <span className="font-semibold">Client:</span> {invoice.client}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {invoice.email}
          </p>
          <p>
            <span className="font-semibold">Date Issued:</span>{" "}
            {invoice.dateIssued}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {invoice.status}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <ul className="divide-y divide-gray-200">
            {invoice.items.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{item.description}</span>
                <span>${item.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-right text-xl font-bold">
          Total: ${invoice.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
