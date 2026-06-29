import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SetupForm } from "./SetupForm";

export const dynamic = 'force-dynamic';

export default async function SetupPage() {
  const adminCount = await prisma.user.count();
  
  if (adminCount > 0) {
    redirect("/login");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-secondary text-secondary-foreground p-8 rounded-xl shadow-xl border-t-4 border-accent">
        <h1 className="text-2xl font-bold text-center mb-6">Initial Administrator Setup</h1>
        <p className="text-sm text-center mb-6 opacity-80">Create the first admin user for the system. This page will be disabled after setup.</p>
        <SetupForm />
      </div>
    </div>
  );
}
