"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess("Account created successfully! Redirecting...");
        setFormData({ name: "", email: "", phone: "", password: "" });
        router.push("/"); // <-- redirect here after success
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background">
        <div className="bg-surface dark:bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-head dark:text-head text-3xl font-extrabold mb-8 text-center">
            Sign Up
          </h2>

          {error && <p className="mb-4 text-red-600">{error}</p>}
          {success && <p className="mb-4 text-green-600">{success}</p>}

          <form onSubmit={handleSubmit}>
            {["name", "email", "phone", "password"].map((field) => (
              <div className="mb-4" key={field}>
                <label
                  htmlFor={field}
                  className="block text-textPrimary dark:text-textPrimary text-sm font-semibold mb-2 capitalize"
                >
                  {field === "phone" ? "Mobile Number" : field}
                </label>
                <input
                  id={field}
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  placeholder={`Enter your ${
                    field === "phone" ? "mobile number" : field
                  }`}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full p-2 border border-border dark:border-border rounded bg-container dark:bg-container text-textPrimary dark:text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea dark:focus:ring-sea transition"
                  required={field !== "phone"} // phone optional
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold dark:bg-gold text-head dark:text-head font-bold py-3 rounded hover:bg-highGold dark:hover:bg-highGold transition-colors mb-6"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 border border-border dark:border-border px-4 py-2 rounded hover:bg-ground dark:hover:bg-ground transition text-textPrimary dark:text-textPrimary">
              <FaGoogle className="w-5 h-5" />
              Sign up with Google
            </button>
            <button className="flex items-center gap-2 border border-border dark:border-border px-4 py-2 rounded hover:bg-ground dark:hover:bg-ground transition text-textPrimary dark:text-textPrimary">
              <FaFacebookF className="w-5 h-5" />
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
