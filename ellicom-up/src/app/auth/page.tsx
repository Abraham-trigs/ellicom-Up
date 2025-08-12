"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background">
        <div className="bg-surface dark:bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-head dark:text-head text-3xl font-extrabold mb-8 text-center">
            Log In to Ellicom Hub
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-2 border border-border dark:border-border px-4 py-3 rounded hover:bg-ground dark:hover:bg-ground transition text-textPrimary dark:text-textPrimary font-semibold"
            >
              <FaGoogle className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              onClick={() => signIn("facebook")}
              className="flex items-center justify-center gap-2 border border-border dark:border-border px-4 py-3 rounded hover:bg-ground dark:hover:bg-ground transition text-textPrimary dark:text-textPrimary font-semibold"
            >
              <FaFacebookF className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>

          <p className="text-center text-textSecondary dark:text-textSecondary">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-gold dark:text-gold font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
