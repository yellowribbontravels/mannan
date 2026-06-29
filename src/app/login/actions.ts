"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAdmin(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials." };
        default:
          return { success: false, message: "Something went wrong." };
      }
    }
    throw error; // Let next/navigation handle redirects if needed, but we passed redirect: false
  }
}
