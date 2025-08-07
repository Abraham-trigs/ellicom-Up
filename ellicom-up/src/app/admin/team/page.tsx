"use client";

import { useEffect, useState } from "react";
import { useTeamStore } from "@/lib/store/TeamStore";

export default function TeamPage() {
  const { members, fetchMembers, addMember, updateMember, deleteMember } =
    useTeamStore();
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

  const handleSubmit = async () => {
    if (editingId) {
      await updateMember(editingId, form);
      setEditingId(null);
    } else {
      await addMember(form);
    }
    setForm({ name: "", email: "", phone: "", role: "STAFF" });
  };

  const startEdit = (member) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone || "",
      role: member.role,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>

      <div className="mb-6 space-y-2">
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
      </div>

      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <strong>{member.name}</strong> ({member.role}) – {member.email} –{" "}
              {member.phone}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(member)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMember(member.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
