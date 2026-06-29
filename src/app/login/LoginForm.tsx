"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const setupSuccess = searchParams.get("setup") === "success";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await loginAdmin(email, password);
    if (res.success) {
      window.location.href = "/admin"; // Force full reload to update auth state
    } else {
      setError(res.message || "Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {setupSuccess && (
        <div className="bg-green-500/10 text-green-500 p-3 rounded text-sm text-center mb-4 border border-green-500/20">
          Setup successful! You can now log in.
        </div>
      )}
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
        Log In
      </button>
    </form>
  )
}
