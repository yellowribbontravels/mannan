"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(data: { name: string, description: string, slug: string, categoryId: string, specs: string, sizes: string, images: string }) {
  try {
    const product = await prisma.product.create({ data });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/categories/${data.categoryId}`);
    return { success: true, product };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, message: err?.message || "Failed to create product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({ where: { id }});
    if (product) {
      await prisma.product.delete({ where: { id } });
      revalidatePath("/admin/products");
      revalidatePath("/products");
      revalidatePath(`/categories/${product.categoryId}`);
    }
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, message: err?.message || "Failed to delete product" };
  }
}

export async function updateProduct(id: string, data: { name: string, description: string, slug: string, categoryId: string, specs: string, sizes: string, images: string }) {
  try {
    const product = await prisma.product.update({ where: { id }, data });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    revalidatePath(`/categories/${data.categoryId}`);
    return { success: true, product };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, message: err?.message || "Failed to update product" };
  }
}
