import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/config/firebase';

import type { AuthUser } from '../types';

export const useGetAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: AuthUser | null) => {
        setUser(user);
        setIsLoading(false);
      },
      (error: Error) => {
        setError(error);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { user, isLoading, error };
};
