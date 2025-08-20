// app/admin/invoice/page.tsx
export default function InvoicePage() {
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Invoices</h1>
        <p className="text-gray-600">View and manage all invoices from here.</p>

        {/* Placeholder content */}
        <div className="mt-10 border border-dashed border-gray-300 rounded-xl p-10 text-center">
          <p className="text-gray-400">No invoices found.</p>
        </div>
      </div>
    </div>
  );
}
