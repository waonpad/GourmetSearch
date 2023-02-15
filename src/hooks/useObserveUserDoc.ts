import { useEffect, useState } from 'react';

import type { FireUser } from '@/features/users';
import { useFireUser, useCreateFireUser } from '@/features/users';

import type { User } from 'firebase/auth';
import type { FirestoreError } from 'firebase/firestore';

export const useObserveUserDoc = (
  user: User | null
): { userDocData: FireUser | undefined; isLoading: boolean; error: FirestoreError | null } => {
  const { data: userDocData, isLoading, error } = useFireUser(user?.uid);

  const createFireUser = useCreateFireUser(user);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    console.log(createFireUser.error);
  }, [createFireUser.error]);

  useEffect(() => {
    if (user && !isLoading && !userDocData && !check) {
      console.log('mutateDTO');
      setCheck(true);
      createFireUser.mutateDTO();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDocData, isLoading, user]);

  return {
    userDocData,
    isLoading,
    error,
  };
};
