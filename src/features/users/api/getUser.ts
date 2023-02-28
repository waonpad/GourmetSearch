import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { User } from '../types';

export const useGetUser = (uid: string | undefined) => {
  const user = useFirestore<User>(uid ? doc(collection(db, 'users'), uid) : undefined);

  return user;
};
