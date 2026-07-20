import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "../../new/ProductForm";
import { Package } from "lucide-react";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
          <p className="text-muted-foreground text-sm">Update {product.name}</p>
        </div>
      </div>
      
      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
