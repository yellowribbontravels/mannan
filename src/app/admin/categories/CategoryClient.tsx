"use client";

import { useState } from "react";
import { deleteCategory } from "./actions";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CategoryClient({ initialCategories }: { initialCategories: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>(initialCategories);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const res = await deleteCategory(id);
    if (res.success) {
      setCategories(categories.filter((c: { id: string }) => c.id !== id));
    } else {
      alert(res.message || "An error occurred");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Categories ({categories.length})</h2>
        <Link 
          href="/admin/categories/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition relative z-20"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted border-b border-border text-muted-foreground text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Slug</th>
              <th className="p-4 font-semibold">Products</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">No categories found.</td>
              </tr>
            ) : categories.map(category => (
              <tr key={category.id} className="border-b border-border/50 hover:bg-muted/50 transition">
                <td className="p-4 font-medium">{category.name}</td>
                <td className="p-4 text-muted-foreground">{category.slug}</td>
                <td className="p-4">{category._count?.products || 0}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-600 transition p-2 rounded hover:bg-red-500/10" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
