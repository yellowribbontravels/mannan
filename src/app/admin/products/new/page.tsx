import { prisma } from "@/lib/prisma";
import { ProductForm } from "./ProductForm";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  const safeCategories = categories.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Add New Product</h1>
      <ProductForm categories={safeCategories} />
    </div>
  );
}
