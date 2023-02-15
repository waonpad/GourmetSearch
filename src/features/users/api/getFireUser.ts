import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import { fireUserConverter } from './fireUserConverter';

import type { FireUser } from '../types';

export const useFireUser = (uid: string | undefined) => {
  const fireUser = useFirestore<FireUser>(
    uid ? doc(collection(db, 'users'), uid).withConverter(fireUserConverter) : undefined
  );

  return fireUser;
};
