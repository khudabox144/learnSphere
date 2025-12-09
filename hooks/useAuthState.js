"use client";

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuthState() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 useAuthState: Setting up auth listener...");
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔐 useAuthState: User detected:", firebaseUser?.email || "No user");
      setUser(firebaseUser);
      setLoading(false);
    });

    // Cleanup
    return () => {
      console.log("🔐 useAuthState: Cleaning up listener");
      unsubscribe();
    };
  }, []);

  return { user, loading };
}