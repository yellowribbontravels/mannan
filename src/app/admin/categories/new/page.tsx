import { CategoryForm } from "./CategoryForm";

export const dynamic = 'force-dynamic';

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Add New Category</h1>
      <CategoryForm />
    </div>
  );
}
