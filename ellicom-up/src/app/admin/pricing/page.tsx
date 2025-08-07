"use client";

import { useEffect, useState } from "react";

type PriceItem = {
  id: string;
  name: string;
  amount: number;
  description?: string;
};

export default function PricingPage() {
  const [pricing, setPricing] = useState<PriceItem[]>([]);
  const [form, setForm] = useState({ name: "", amount: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // 🔜 Replace with actual fetch call to /api/pricing
    // Example:
    // fetch('/api/pricing').then(res => res.json()).then(setPricing);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.amount)
      return alert("Name and Amount are required");
    // 🔜 Replace with real logic to call add/edit API
    if (editingId) {
      // update pricing item
    } else {
      // add new pricing item
    }
    setForm({ name: "", amount: "", description: "" });
    setEditingId(null);
  };

  const startEdit = (item: PriceItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      amount: String(item.amount),
      description: item.description || "",
    });
  };

  const handleDelete = async (id: string) => {
    // 🔜 Replace with real delete call
    // await deletePricing(id)
    setPricing((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>

      <div className="mb-6 space-y-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Price" : "Add Price"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", amount: "", description: "" });
            }}
            className="ml-4 text-sm text-gray-600 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <ul>
        {pricing.map((item) => (
          <li
            key={item.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <strong>{item.name}</strong> – ${item.amount}{" "}
              {item.description && (
                <>
                  – <em>{item.description}</em>
                </>
              )}
            </div>
            <div className="space-x-2">
              <button onClick={() => startEdit(item)} className="text-blue-500">
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
