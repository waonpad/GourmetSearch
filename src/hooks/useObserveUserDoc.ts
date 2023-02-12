import { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@/config/firebase';

import { useUserDocMutation } from './useUserDocMutaion';

import type { User } from 'firebase/auth';
import type { DocumentData, DocumentSnapshot, FirestoreError } from 'firebase/firestore';

export const useObserveUserDoc = (user: User | null) => {
  const [userDocData, setUserDocData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  const { init } = useUserDocMutation(user);

  const handleDoc = (doc: DocumentSnapshot<DocumentData>) => {
    if (doc.exists()) {
      const data = doc.data();
      setUserDocData(data);
    } else {
      init();
    }
    setIsLoading(false);
  };

  const handleError = (error: FirestoreError) => {
    setError(error);
    console.log('onSnapshotでのエラーです', error);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), handleDoc, handleError);
      return unsubscribe;
    } else {
      setIsLoading(false);
      setUserDocData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { userDocData, isLoading, error };
};
