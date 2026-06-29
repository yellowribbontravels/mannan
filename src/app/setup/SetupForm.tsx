"use client";

import { useState } from "react";
import { setupAdmin } from "./actions";
import { useRouter } from "next/navigation";

export function SetupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await setupAdmin(email, password);
    if (res.success) {
      router.push("/login?setup=success");
    } else {
      setError(res.message || "An error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-background text-foreground border border-border focus:ring-2 focus:ring-accent outline-none" 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-background text-foreground border border-border focus:ring-2 focus:ring-accent outline-none" 
          required 
        />
      </div>
      <button type="submit" className="w-full bg-accent text-accent-foreground font-bold py-2 rounded hover:bg-accent/90 transition mt-4">
        Create Admin Account
      </button>
    </form>
  )
}
