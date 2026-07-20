"use client";

import { useState } from "react";
import { deleteProduct } from "./actions";
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductClient({ initialProducts }: { initialProducts: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>(initialProducts);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(id);
    if (res.success) {
      setProducts(products.filter((p: { id: string }) => p.id !== id));
    } else {
      alert(res.message || "An error occurred");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Products ({products.length})</h2>
        <Link 
          href="/admin/products/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition relative z-20"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted border-b border-border text-muted-foreground text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Sizes</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">No products found.</td>
              </tr>
            ) : products.map(product => {
              let productSizes = [];
              try { productSizes = product.sizes ? JSON.parse(product.sizes) : []; } catch { /* ignore */ }
              
              return (
                <tr key={product.id} className="border-b border-border/50 hover:bg-muted/50 transition">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-muted-foreground">{product.category?.name}</td>
                  <td className="p-4 text-muted-foreground">
                    <div className="flex gap-1 flex-wrap">
                      {productSizes.slice(0, 3).map((s: string) => (
                        <span key={s} className="bg-secondary/10 px-2 py-0.5 rounded text-xs">{s}</span>
                      ))}
                      {productSizes.length > 3 && <span className="text-xs">+{productSizes.length - 3}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/products/${product.id}/edit`} className="inline-block text-blue-500 hover:text-blue-600 transition p-2 rounded hover:bg-blue-500/10 mr-2" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-600 transition p-2 rounded hover:bg-red-500/10" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
