"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🔐 Attempting login with:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful!");
      router.push("/learner/dashboard");
    } catch (error) {
      console.error("❌ Login error:", error);
      setLoading(false);
      if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
        setError("Invalid email or password");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 transform transition duration-500 hover:scale-105">
        
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6 animate-fadeIn">
          Welcome Back
        </h1>

        {error && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm dark:bg-red-900 dark:text-red-200 dark:border-red-700 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400 transition"
            />
            <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm bg-white dark:bg-gray-800 px-1 transition-all">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400 transition"
            />
            <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm bg-white dark:bg-gray-800 px-1 transition-all">
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center space-x-2 transition-all duration-300"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          <p>
            Need an account? 
            <a href="/register" className="ml-1 font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
