import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { User } from 'firebase/auth';

export const useCreateUser = (user: User | null) => {
  const createUserMutaion = useFirestoreDocumentMutation(doc(db, 'users', user ? user?.uid : '_'));

  const mutateDTO = () => {
    if (user) {
      console.log(user);
      const newUser = {
        displayName: user.displayName,
        email: user.email,
        role: 'USER',
      };

      createUserMutaion.mutate(newUser);
    }
  };

  return {
    ...createUserMutaion,
    mutateDTO,
  };
};
