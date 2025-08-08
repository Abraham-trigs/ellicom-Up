"use client";

import { useEffect, useState, useMemo } from "react";
import { useTeamStore } from "@/lib/store/TeamStore";

const ROLES = ["All", "STAFF", "ADMIN", "SECRETARY"] as const;

export default function TeamPage() {
  const { members, fetchMembers, addMember, updateMember, deleteMember } =
    useTeamStore();

  type Tab = (typeof ROLES)[number] | "addMember";
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "STAFF",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filteredMembers = useMemo(() => {
    if (activeTab === "addMember" || activeTab === "All") return members;
    return members.filter((m) => m.role === activeTab);
  }, [activeTab, members]);

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    if (editingId) {
      await updateMember(editingId, form);
      setEditingId(null);
    } else {
      await addMember(form);
    }

    setForm({ name: "", email: "", phone: "", role: "STAFF" });
    setActiveTab("All");
  };

  const startEdit = (member: (typeof members)[number]) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone || "",
      role: member.role,
    });
    setActiveTab("addMember");
  };

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
                onClick={() => {
                  setActiveTab(role);
                  setEditingId(null);
                  setForm({ name: "", email: "", phone: "", role: "STAFF" });
                }}
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
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveTab("addMember");
                setEditingId(null);
                setForm({ name: "", email: "", phone: "", role: "STAFF" });
              }}
              className={`pb-2 ${
                activeTab === "addMember"
                  ? "border-b-2 border-gold text-gold dark:border-highGold dark:text-highGold"
                  : "text-inactive dark:text-textSecondary hover:text-gold dark:hover:text-highGold"
              }`}
            >
              {editingId ? "Edit Member" : "Add Member"}
            </button>
          </li>
        </ul>
      </nav>

      {/* Add/Edit Member Form */}
      {activeTab === "addMember" && (
        <div className="mb-6 max-w-md space-y-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-2 w-full"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
            <option value="SECRETARY">Secretary</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Add"} Member
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", email: "", phone: "", role: "STAFF" });
                setActiveTab("All");
              }}
              className="ml-4 text-sm text-gray-600 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* Member List */}
      {activeTab !== "addMember" && (
        <>
          {filteredMembers.length === 0 ? (
            <p className="text-inactive dark:text-textMuted italic">
              No members found for role "{activeTab}".
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

                    <div className="flex space-x-3">
                      <button
                        onClick={() => startEdit(member)}
                        className="text-sm px-3 py-1 rounded-full bg-sea text-power
                                   hover:bg-neonSea transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="text-sm px-3 py-1 rounded-full bg-red-600 text-white
                                   hover:bg-red-700 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </div>
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
