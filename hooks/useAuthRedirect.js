"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useAuthRedirect(redirectTo = '/learner/dashboard', requireAuth = false) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Don't do anything while loading
    if (loading) return;

    console.log('useAuthRedirect:', { user: user?.email, requireAuth, redirectTo });

    if (requireAuth && !user) {
      // If auth is required but no user, redirect to login
      console.log('No user, redirecting to login');
      router.replace('/auth/login');
      return;
    }

    if (!requireAuth && user) {
      // If auth is NOT required but user exists, redirect to dashboard
      console.log('User exists, redirecting to dashboard');
      router.replace(redirectTo);
      return;
    }

    setShouldRedirect(false);
  }, [user, loading, requireAuth, redirectTo, router]);

  return { user, loading, shouldRedirect };
}