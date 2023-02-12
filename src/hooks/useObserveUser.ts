import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/config/firebase';

import type { User } from 'firebase/auth';

export const useObserveUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const handleUser = (user: User | null) => {
    setUser(user);
    setIsLoading(false);
  };

  const handleError = (error: Error) => {
    setError(error);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribed = onAuthStateChanged(auth, handleUser, handleError);
    return () => {
      unsubscribed();
    };
  }, []);

  return { user, isLoading, error };
};
