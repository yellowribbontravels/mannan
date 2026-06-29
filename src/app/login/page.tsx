import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-secondary text-secondary-foreground p-8 rounded-xl shadow-xl border-t-4 border-accent">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Portal Login</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
