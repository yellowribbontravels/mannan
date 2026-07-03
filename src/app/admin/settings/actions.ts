"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" }
    });
    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function updateSiteSettings(data: {
  primaryEmail?: string;
  primaryPhone?: string;
  addressText?: string;
  googleMapsEmbed?: string;
  contactCards?: string; // JSON string
}) {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: {
        ...data,
      },
      create: {
        id: "global",
        ...data,
      },
    });
    
    // Revalidate paths that use these settings
    revalidatePath("/", "layout"); // Revalidate all layouts (WhatsAppFloat)
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    
    return { success: true, settings };
  } catch (error) {
    console.error("Error updating site settings:", error);
    return { success: false, message: "Failed to update settings" };
  }
}
