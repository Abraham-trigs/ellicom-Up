"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/home/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Please fill in both fields");

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return setError(data.error || "Invalid credentials");

      // Redirect based on role
      switch (data.role) {
        case "SUPERADMIN":
          router.push("/dashboard/superadmin");
          break;
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "SECRETARY":
          router.push("/dashboard/secretary");
          break;
        case "STAFF":
          router.push("/dashboard/staff");
          break;
        case "CLIENT":
        default:
          router.push("/dashboard/client");
          break;
      }
    } catch (err) {
      setLoading(false);
      setError("Network error. Try again.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-head text-3xl font-extrabold mb-8 text-center">
            Log In to Ellicom Hub
          </h2>

          {error && <p className="mb-4 text-red-600">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-border rounded bg-container text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-border rounded bg-container text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea transition"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-head font-semibold py-3 rounded hover:bg-highGold transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-textSecondary">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-gold font-semibold hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
