import { prisma } from "@/lib/prisma";
import { CategoryClient } from "./CategoryClient";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } }
  });

  // Serialize to prevent React Client Boundary Hydration issues with Dates
  const safeCategories = categories.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Manage Categories</h1>
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryClient initialCategories={safeCategories} />
      </Suspense>
    </div>
  );
}
