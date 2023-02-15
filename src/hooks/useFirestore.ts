import { useEffect, useState } from 'react';

import { onSnapshot } from 'firebase/firestore';
import { useErrorHandler } from 'react-error-boundary';

import { fireUserValidator } from '@/features/users';

import type { Query, DocumentReference, DocumentData, FirestoreError } from 'firebase/firestore';

export const useFirestore = <T>(
  docOrQuery: Query<DocumentData> | DocumentReference | undefined
) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const handleError = useErrorHandler();

  const [test, setTest] = useState<string>('');

  useEffect(() => {
    if (JSON.stringify(docOrQuery) !== test && docOrQuery) {
      console.log('query updated');
      setTest(JSON.stringify(docOrQuery));
      // console.log(JSON.stringify(docOrQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docOrQuery]);

  useEffect(() => {
    if (!docOrQuery) {
      return;
    }
    console.log('request');
    setIsLoading(true);
    let unsubscribe: () => void;
    if (docOrQuery.type === 'document') {
      unsubscribe = onSnapshot(docOrQuery as DocumentReference, {
        next(doc) {
          if (doc.exists()) {
            console.log(doc.data());
            if (fireUserValidator(doc.data())) {
              const updatedData = doc.data();
              setData(updatedData as T);
              setIsLoading(false);
              setError(null);
            } else {
              handleError('invalid');
              setIsLoading(false);
              unsubscribe;
            }
          } else {
            console.log('no such document');
            setIsLoading(false);
            unsubscribe;
          }
        },
        error(error) {
          setError(error);
          unsubscribe;
        },
      });
    } else {
      unsubscribe = onSnapshot(docOrQuery as Query<DocumentData>, {
        next(snapshot) {
          console.log(snapshot);
          const updatedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setData(updatedData as unknown as T);
          setIsLoading(false);
          setError(null);
        },
        error(error) {
          setError(error);
          unsubscribe;
        },
      });
    }
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  return { data, isLoading, error };
};
