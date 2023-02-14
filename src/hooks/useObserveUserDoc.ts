import { useEffect } from 'react';

import type { FireUser } from '@/features/users';
import { useFireUser, useCreateFireUser } from '@/features/users';

import type { User } from 'firebase/auth';
import type { FirestoreError } from 'firebase/firestore';

export const useObserveUserDoc = (
  user: User | null
): { userDocData: FireUser | undefined; isLoading: boolean; error: FirestoreError | null } => {
  const { data: userDocData, isLoading, error } = useFireUser(user ? user?.uid : '_');

  const createFireUser = useCreateFireUser();

  useEffect(() => {
    if (user && !isLoading && !userDocData) {
      createFireUser.mutateDTO(user);
    }
  }, [userDocData, isLoading, user, createFireUser]);

  return {
    userDocData,
    isLoading,
    error,
  };
};
