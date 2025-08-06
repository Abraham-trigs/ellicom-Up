"use client";

import { useState } from "react";

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "STAFF", // default role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim())
      return alert("Name and email are required.");

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create user");

      alert("User created!");
      setForm({ name: "", email: "", role: "STAFF" });
    } catch (error) {
      alert("Error creating user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-4 rounded">
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 bg-background border border-border rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 bg-background border border-border rounded"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 bg-background border border-border rounded"
        required
      >
        <option value="SUPERADMIN">Super Admin</option>
        <option value="ADMIN">Admin</option>
        <option value="SECRETARY">Secretary</option>
        <option value="STAFF">Staff</option>
        <option value="CLIENT">Client</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-gold text-black py-2 px-4 rounded hover:bg-highGold"
      >
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
