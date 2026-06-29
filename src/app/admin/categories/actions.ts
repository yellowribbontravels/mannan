"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data: { name: string, description?: string, slug: string, image?: string }) {
  try {
    const cat = await prisma.category.create({ data });
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true, category: cat };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, message: err?.message || "Failed to create category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, message: err?.message || "Failed to delete category (it may contain products)" };
  }
}
