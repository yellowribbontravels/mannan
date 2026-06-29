"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
    >
      <LogOut className="w-5 h-5" /> Sign Out
    </button>
  );
}
