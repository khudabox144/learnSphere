"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CourseLearning from "@/components/CourseLearning";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const courseId = params.id;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    // TODO: Check if user is enrolled in this course
    // if (user && !isEnrolled) {
    //   router.push(`/courses/${courseId}`);
    // }
  }, [user, loading, router, courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading learning content...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <CourseLearning />;
}