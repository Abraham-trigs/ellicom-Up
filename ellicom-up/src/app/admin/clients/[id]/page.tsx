export default function ClientDetailPage() {
  // Dummy static UI — replace with real client data once ready
  const client = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-1234",
    totalRevenue: 12999.99,
    totalJobs: 7,
    createdAt: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-surface text-gray-900 dark:text-textPrimary">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{client.name}</h1>
        <div className="space-y-2 text-gray-700 dark:text-textSecondary">
          <p>
            <span className="font-semibold">Email:</span> {client.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {client.phone}
          </p>
          <p>
            <span className="font-semibold">Total Revenue:</span> $
            {client.totalRevenue.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Total Jobs:</span>{" "}
            {client.totalJobs}
          </p>
          <p>
            <span className="font-semibold">Joined:</span> {client.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}
