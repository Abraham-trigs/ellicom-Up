export default function TeamMemberPage() {
  const user = {
    name: "Angela Mensah",
    email: "angela@company.com",
    phone: "+233 24 123 4567",
    role: "STAFF",
    totalJobs: 15,
    totalRevenue: 4500.75,
    createdAt: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-surface text-gray-900 dark:text-textPrimary">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

        <div className="space-y-2 text-gray-700 dark:text-textSecondary">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">Total Jobs:</span> {user.totalJobs}
          </p>
          <p>
            <span className="font-semibold">Revenue:</span> $
            {user.totalRevenue.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Joined:</span> {user.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}
