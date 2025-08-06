// app/admin/team/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function TeamMemberPage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user || !["ADMIN", "SECRETARY", "STAFF"].includes(user.role)) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
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
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
