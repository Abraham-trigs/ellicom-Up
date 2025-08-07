"use client";

import { useEffect, useState, useMemo } from "react";
import { useJobPricingStore } from "@/lib/store/JobPricingStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JobPricing } from "@prisma/client";

export default function PricingPage() {
  const {
    jobPricingList,
    fetchJobPricing,
    createJobPricing,
    updateJobPricing,
    deleteJobPricing,
  } = useJobPricingStore();

  const [filterJobType, setFilterJobType] = useState("All");
  const [formData, setFormData] = useState<
    Omit<JobPricing, "id" | "createdAt" | "updatedAt">
  >({
    jobType: "",
    materialType: "",
    variable: "",
    unitPrice: 0,
    modifiers: [],
    notes: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchJobPricing();
  }, [fetchJobPricing]);

  const filteredList = useMemo(() => {
    return jobPricingList.filter((item) =>
      filterJobType === "All" ? true : item.jobType === filterJobType
    );
  }, [jobPricingList, filterJobType]);

  const handleSubmit = async () => {
    if (editingId) {
      await updateJobPricing(editingId, formData);
    } else {
      await createJobPricing(formData);
    }

    setFormData({
      jobType: "",
      materialType: "",
      variable: "",
      unitPrice: 0,
      modifiers: [],
      notes: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item: JobPricing) => {
    setFormData({
      jobType: item.jobType,
      materialType: item.materialType ?? "",
      variable: item.variable,
      unitPrice: item.unitPrice,
      modifiers: item.modifiers,
      notes: item.notes ?? "",
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    await deleteJobPricing(id);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Job Pricing Manager</h1>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-4">
        <Label>Filter by Job Type:</Label>
        <select
          className="border rounded-md px-3 py-1 text-sm bg-background"
          value={filterJobType}
          onChange={(e) => setFilterJobType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Designing">Designing</option>
          <option value="Typing">Typing</option>
          <option value="Scanning">Scanning</option>
          <option value="Lamination">Lamination</option>
          <option value="Large Format">Large Format</option>
        </select>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Pricing" : "Add New Pricing"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Job Type</Label>
            <Input
              value={formData.jobType}
              onChange={(e) =>
                setFormData((f) => ({ ...f, jobType: e.target.value }))
              }
              placeholder="e.g. Designing"
            />
          </div>

          <div>
            <Label>Variable</Label>
            <Input
              value={formData.variable}
              onChange={(e) =>
                setFormData((f) => ({ ...f, variable: e.target.value }))
              }
              placeholder="e.g. Logo, Flyer"
            />
          </div>

          <div>
            <Label>Material Type (optional)</Label>
            <Input
              value={formData.materialType || ""}
              onChange={(e) =>
                setFormData((f) => ({ ...f, materialType: e.target.value }))
              }
              placeholder="e.g. Glossy, Matte"
            />
          </div>

          <div>
            <Label>Unit Price</Label>
            <Input
              type="number"
              value={formData.unitPrice}
              onChange={(e) =>
                setFormData((f) => ({
                  ...f,
                  unitPrice: parseFloat(e.target.value),
                }))
              }
              placeholder="e.g. 10"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Modifiers (comma separated)</Label>
            <Input
              value={formData.modifiers.join(", ")}
              onChange={(e) =>
                setFormData((f) => ({
                  ...f,
                  modifiers: e.target.value.split(",").map((m) => m.trim()),
                }))
              }
              placeholder="e.g. colored, double-sided"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData((f) => ({ ...f, notes: e.target.value }))
              }
              placeholder="Optional notes..."
            />
          </div>

          <Button className="w-full md:col-span-2" onClick={handleSubmit}>
            {editingId ? "Update Pricing" : "Create Pricing"}
          </Button>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                {item.jobType} – {item.variable}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {item.materialType && <p>Material: {item.materialType}</p>}
              <p className="font-medium text-lg">
                GHS {item.unitPrice.toFixed(2)}
              </p>
              {item.notes && (
                <p className="text-muted-foreground text-sm">{item.notes}</p>
              )}

              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
