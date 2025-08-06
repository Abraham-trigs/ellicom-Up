// app/admin/job/[id]/page.tsx

export default function JobDetailPage() {
  // Dummy static job data
  const job = {
    title: "Website Redesign",
    details: "Revamp the homepage and contact form.",
    status: "In Progress",
    createdAt: new Date().toLocaleDateString(),
    createdBy: "John Doe",
    handledBy: "Jane Smith",
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Details:</span> {job.details}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {job.status}
          </p>
          <p>
            <span className="font-semibold">Created At:</span> {job.createdAt}
          </p>
          <p>
            <span className="font-semibold">Created By:</span> {job.createdBy}
          </p>
          <p>
            <span className="font-semibold">Handled By:</span> {job.handledBy}
          </p>
        </div>
      </div>
    </div>
  );
}
