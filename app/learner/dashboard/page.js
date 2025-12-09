"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect ONLY if NOT loading and NO user
  useEffect(() => {
    if (!loading && !user) {
      console.log("🚫 No user found, redirecting to login");
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user (after loading), show nothing (redirect will happen)
  if (!user) {
    return null;
  }

  // User is authenticated, show dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.email}</p>
          </div>
          <button
            onClick={() => {
              // Add logout functionality
              console.log("Logout clicked");
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Content</h2>
          <p>Dashboard content goes here...</p>
        </div>
      </div>
    </div>
  );
}