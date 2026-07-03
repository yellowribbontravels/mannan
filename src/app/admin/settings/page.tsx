import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./SettingsClient";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Site Settings</h1>
      <SettingsClient initialSettings={settings} />
    </div>
  );
}
