import { useEffect, useState } from 'react';

import type { User as UserDoc } from '@/features/users';
import { useGetUser, useCreateUser } from '@/features/users';

import type { User } from 'firebase/auth';
import type { FirestoreError } from 'firebase/firestore';

export const useObserveUserDoc = (
  user: User | null
): { userDocData: UserDoc | undefined; isLoading: boolean; error: FirestoreError | null } => {
  const { data: userDocData, isLoading, error } = useGetUser(user?.uid);

  const createUser = useCreateUser(user);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (user && !isLoading && !userDocData && !check) {
      setCheck(true);
      console.log('Creating user doc...');
      createUser.mutateDTO();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDocData, isLoading, user]);

  return {
    userDocData,
    isLoading,
    error,
  };
};
