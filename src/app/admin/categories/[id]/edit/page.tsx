import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CategoryForm } from "../../new/CategoryForm";
import { Folder } from "lucide-react";

export default async function EditCategoryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Folder className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Category</h1>
          <p className="text-muted-foreground text-sm">Update {category.name}</p>
        </div>
      </div>
      
      <CategoryForm initialData={category} />
    </div>
  );
}
