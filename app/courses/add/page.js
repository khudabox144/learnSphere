"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AddCourse from "@/components/AddCourse";

export default function AddCoursePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect if not authenticated or not organizer/teacher
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      }
      // TODO: Add role-based access control
      // if (user.role !== 'organizer' && user.role !== 'teacher') {
      //   router.push("/unauthorized");
      // }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // TODO: Add role check here
  // if (!user || (user.role !== 'organizer' && user.role !== 'teacher')) {
  //   return null;
  // }

  return <AddCourse />;
}