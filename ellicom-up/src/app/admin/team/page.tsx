"use client";

import { useEffect } from "react";
import { useStaffStore } from "@/lib/store/StaffStore";

export default function TeamPage() {
  const { users, loading, error, fetchStaffUsers } = useStaffStore();

  useEffect(() => {
    fetchStaffUsers();
  }, [fetchStaffUsers]);

  if (loading) return <p className="p-4">Loading team members...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-ground dark:bg-surface text-head dark:text-textPrimary min-h-screen">
      <h1 className="text-xl font-bold mb-6">Team Members</h1>

      {users.length === 0 ? (
        <p className="text-inactive dark:text-textMuted">
          No team members found.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="border border-border rounded-md p-3 bg-sea dark:bg-surface shadow-sm flex flex-col gap-1"
            >
              <h2 className="text-md font-bold truncate">
                {user.name || "No Name"}
              </h2>
              <p className="text-xs truncate">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-xs truncate">
                <strong>Phone:</strong> {user.phone || "N/A"}
              </p>
              <p className="text-xs truncate">
                <strong>Role:</strong> {user.role}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
