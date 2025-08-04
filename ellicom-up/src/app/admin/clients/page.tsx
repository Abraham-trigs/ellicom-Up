import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { User } from "@prisma/client";

export default async function ClientsPage() {
  const clients: User[] = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">👥 Clients</h1>

      <ul className="space-y-4">
        {clients.map((client) => (
          <li
            key={client.id}
            className="border border-border rounded-xl p-4 bg-surface text-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{client.name}</h2>
                <p className="text-textSecondary text-sm">
                  {client.email} · {client.phone || "No phone"}
                </p>
              </div>
              <Link
                href={`/admin/clients/${client.id}`}
                className="text-sm text-gold hover:underline"
              >
                View Details →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
