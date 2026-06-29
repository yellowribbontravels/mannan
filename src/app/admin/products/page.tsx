import { prisma } from "@/lib/prisma";
import { ProductClient } from "./ProductClient";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: { category: true }
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  // Serialize to prevent React Client Boundary Hydration issues with Dates
  const safeProducts = products.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    category: {
      ...p.category,
      createdAt: p.category.createdAt.toISOString(),
      updatedAt: p.category.updatedAt.toISOString(),
    }
  }));

  const safeCategories = categories.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Manage Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductClient initialProducts={safeProducts} categories={safeCategories} />
      </Suspense>
    </div>
  );
}
