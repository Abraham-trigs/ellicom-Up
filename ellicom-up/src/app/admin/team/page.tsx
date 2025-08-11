"use client";

import { useEffect, useState, useMemo } from "react";
import { useStaffStore, UserRole, User } from "@/lib/store/StaffStore";

const ROLES = ["All", "STAFF", "ADMIN", "SECRETARY"] as const;

export default function TeamPage() {
  const { users, fetchStaffUsers } = useStaffStore();

  type Tab = (typeof ROLES)[number] | "addMember";
  const [activeTab, setActiveTab] = useState<Tab>("All");

  // Form state removed here because StaffStore currently doesn't support add/update/delete

  useEffect(() => {
    fetchStaffUsers();
  }, [fetchStaffUsers]);

  // Filter users client-side by role tab
  const filteredMembers = useMemo(() => {
    if (activeTab === "All" || activeTab === "addMember") return users;
    return users.filter((user) => user.role === activeTab);
  }, [activeTab, users]);

  return (
    <div className="p-6 bg-ground dark:bg-surface text-head dark:text-textPrimary min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>

      {/* Tabs */}
      <nav className="border-b border-border mb-6">
        <ul className="flex space-x-6 text-sm font-medium flex-wrap">
          {ROLES.map((role) => (
            <li key={role}>
              <button
                type="button"
                onClick={() => setActiveTab(role)}
                className={`pb-2 ${
                  activeTab === role
                    ? "border-b-2 border-gold text-gold dark:border-highGold dark:text-highGold"
                    : "text-inactive dark:text-textSecondary hover:text-gold dark:hover:text-highGold"
                }`}
              >
                {role}
              </button>
            </li>
          ))}
          {/* Remove addMember tab since no add/edit support yet */}
        </ul>
      </nav>

      {/* Member List */}
      {activeTab !== "addMember" && (
        <>
          {filteredMembers.length === 0 ? (
            <p className="text-inactive dark:text-textMuted italic">
              No members found for role &apos;{activeTab}&apos;.
            </p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {filteredMembers.map((member) => (
                <li
                  key={member.id}
                  className="bg-container dark:bg-surface rounded-lg p-4 shadow-sm
                             hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-head dark:text-textPrimary truncate">
                      {member.name}
                    </h3>
                  </div>

                  <div className="space-y-1 text-sm text-inactive dark:text-textMuted">
                    <p>
                      <span className="font-semibold">Email: </span>
                      <span className="truncate">{member.email}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Phone: </span>
                      <span>{member.phone || "-"}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Role: </span>
                      <span className="text-gold dark:text-highGold">
                        {member.role}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
