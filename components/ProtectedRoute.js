"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check auth directly from Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("ProtectedRoute - User:", user?.email);
      
      if (!user) {
        console.log("ProtectedRoute - No user, redirecting to login");
        router.replace("/auth/login");
      } else {
        setIsAuthorized(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}