// app/admin/job/[id]/page.tsx

export default function JobDetailPage() {
  // Dummy static job data — replace with real fetch later
  const job = {
    title: "Fix Plumbing at Office",
    status: "In Progress",
    details: "Client reported water leakage in the main bathroom.",
    createdBy: {
      name: "Sarah Admin",
      role: "ADMIN",
    },
    handledBy: {
      name: "Jake Staff",
    },
    createdAt: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Status:</span> {job.status}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {job.details || "No details provided."}
          </p>
          <p>
            <span className="font-semibold">Created By:</span>{" "}
            {job.createdBy.name} ({job.createdBy.role})
          </p>
          <p>
            <span className="font-semibold">Handled By:</span>{" "}
            {job.handledBy?.name || "Not assigned"}
          </p>
          <p>
            <span className="font-semibold">Created At:</span> {job.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}
