import { useEffect, useState } from 'react';

import { onSnapshot } from 'firebase/firestore';

import type { Query, DocumentReference, DocumentData, FirestoreError } from 'firebase/firestore';

export const useFirestore = <T>(
  docOrQuery: Query<DocumentData> | DocumentReference | undefined
) => {
  const [firestore, setFirestore] = useState<{
    data: T | undefined;
    isLoading: boolean;
    error: FirestoreError | null;
  }>({
    data: undefined,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!docOrQuery) {
      return;
    }
    console.log('request');
    setFirestore((prev) => ({ ...prev, isLoading: true }));
    let unsubscribe: () => void;
    if (docOrQuery.type === 'document') {
      unsubscribe = onSnapshot(docOrQuery as DocumentReference, {
        next(doc) {
          if (doc.exists()) {
            console.log(doc.data());
            const updatedData = { id: doc.id, ...doc.data() };
            setFirestore({ data: updatedData as unknown as T, isLoading: false, error: null });
          } else {
            console.log('no such document');
            setFirestore((prev) => ({ ...prev, isLoading: false }));
            unsubscribe;
          }
        },
        error(error) {
          setFirestore((prev) => ({ ...prev, isLoading: false, error: error }));
          unsubscribe;
        },
      });
    } else {
      unsubscribe = onSnapshot(docOrQuery as Query<DocumentData>, {
        next(snapshot) {
          console.log(snapshot);
          const updatedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFirestore({ data: updatedData as unknown as T, isLoading: false, error: null });
        },
        error(error) {
          setFirestore((prev) => ({ ...prev, isLoading: false, error: error }));
          unsubscribe;
        },
      });
    }
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(docOrQuery)]);

  return firestore;
};
