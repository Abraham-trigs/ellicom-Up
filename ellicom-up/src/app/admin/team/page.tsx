"use client";

import { useState } from "react";
import { useTeamStore } from "@/store/TeamStore";

export default function TeamList() {
  const { team, loading, error } = useTeamStore();
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const currentUserRole = "SUPERADMIN";

  const filteredTeam = team.filter((member) => {
    const matchesRole = roleFilter === "ALL" || member.role === roleFilter;
    const matchesSearch = member.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading)
    return <p className="text-sm text-gray-400">Loading team members...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-1 border rounded bg-surface text-textPrimary border-border"
        >
          <option value="ALL">All Roles</option>
          {/* <option value="SUPERADMIN">SuperAdmin</option> */}
          <option value="ADMIN">Admin</option>
          <option value="SECRETARY">Secretary</option>
          <option value="STAFF">Staff</option>
        </select>

        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 border rounded bg-surface text-textPrimary border-border"
        />
      </div>

      {/* List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member) => (
          <li
            key={member.id}
            className="bg-surface p-4 rounded-lg border border-borderAlt shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sea to-gold flex items-center justify-center text-white font-bold text-lg uppercase">
              {member.name[0]}
            </div>

            <div className="flex-1">
              <p className="text-textPrimary font-medium">{member.name}</p>
              <p className="text-sm text-textSecondary">{member.role}</p>
            </div>

            {currentUserRole === "SUPERADMIN" && (
              <div className="flex gap-2">
                <button
                  className="text-xs px-2 py-1 rounded bg-gold text-black hover:brightness-110"
                  onClick={() => handlePromote(member.id)}
                >
                  Promote
                </button>
                <button
                  className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleDeactivate(member.id)}
                >
                  Deactivate
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {filteredTeam.length === 0 && (
        <p className="text-sm text-textMuted">No team members found.</p>
      )}
    </div>
  );
}

function handlePromote(userId: string) {
  alert(`Promoted user ${userId} (TODO: implement)`);
}

function handleDeactivate(userId: string) {
  alert(`Deactivated user ${userId} (TODO: implement)`);
}
