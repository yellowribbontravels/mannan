"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function setupAdmin(email: string, password: string) {
  try {
    const count = await prisma.user.count();
    if (count > 0) {
      return { success: false, message: "Admin already exists." };
    }

    const hashedPassword = await hash(password, 10);
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, message: err?.message || "Server error" };
  }
}
