import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { User } from 'firebase/auth';

export const useCreateFireUser = () => {
  const createFireUserMutaion = useFirestoreCollectionMutation(collection(db, 'users'));

  const mutateDTO = (user: User) => {
    const newUser = {
      displayName: user.displayName,
      email: user.email,
      role: 'USER',
    };

    createFireUserMutaion.mutate(newUser);
  };

  return {
    ...createFireUserMutaion,
    mutateDTO,
  };
};
