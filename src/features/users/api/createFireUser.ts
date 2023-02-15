import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { User } from 'firebase/auth';

export const useCreateFireUser = (user: User | null) => {
  const createFireUserMutaion = useFirestoreDocumentMutation(
    doc(collection(db, 'users'), user ? user?.uid : '_')
  );

  const mutateDTO = () => {
    if (user) {
      console.log(user);
      const newUser = {
        displayName: user.displayName,
        email: user.email,
        role: 'USER',
      };

      createFireUserMutaion.mutate(newUser);
    }
  };

  return {
    ...createFireUserMutaion,
    mutateDTO,
  };
};
