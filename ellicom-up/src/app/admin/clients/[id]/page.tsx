// app/admin/client/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function ClientDetailPage({ params }: Props) {
  const client = await prisma.user.findUnique({
    where: {
      id: params.id,
      role: "CLIENT",
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{client.name}</h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {client.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {client.phone || "N/A"}
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
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(client.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
