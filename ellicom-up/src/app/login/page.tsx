import Navbar from "@/components/home/Navbar";
import { Google } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background">
        <div className="bg-surface dark:bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-head dark:text-head text-3xl font-extrabold mb-8 text-center">
            Sign Up
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-textPrimary dark:text-textPrimary text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-2 border border-border dark:border-border rounded bg-container dark:bg-container text-textPrimary dark:text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea dark:focus:ring-sea transition"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-textPrimary dark:text-textPrimary text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-border dark:border-border rounded bg-container dark:bg-container text-textPrimary dark:text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea dark:focus:ring-sea transition"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-textPrimary dark:text-textPrimary text-sm font-semibold mb-2"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full p-2 border border-border dark:border-border rounded bg-container dark:bg-container text-textPrimary dark:text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea dark:focus:ring-sea transition"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-textPrimary dark:text-textPrimary text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full p-2 border border-border dark:border-border rounded bg-container dark:bg-container text-textPrimary dark:text-textPrimary focus:outline-none focus:ring-2 focus:ring-sea dark:focus:ring-sea transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold dark:bg-gold text-head dark:text-head font-bold py-3 rounded hover:bg-highGold dark:hover:bg-highGold transition-colors mb-6"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center justify-center gap-4">
            <button
              className="flex items-center gap-2 border border-border dark:border-border px-4 py-2 rounded hover:bg-ground dark:hover:bg-ground transition text-textPrimary dark:text-textPrimary"
              // onClick handlers later
            >
              <Google className="w-5 h-5" />
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
