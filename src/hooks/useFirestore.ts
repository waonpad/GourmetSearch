import { useEffect, useState } from 'react';

import { onSnapshot } from 'firebase/firestore';

import type { Query, DocumentReference, DocumentData, FirestoreError } from 'firebase/firestore';

type DocOrQuery = Query<DocumentData> | DocumentReference;

export const useFirestore = <T>(docOrQuery: DocOrQuery) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const [test, setTest] = useState<string>('');

  useEffect(() => {
    if (JSON.stringify(docOrQuery) !== test) {
      setTest(JSON.stringify(docOrQuery));
      // console.log(JSON.stringify(docOrQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docOrQuery]);

  useEffect(() => {
    console.log('request');
    setIsLoading(true);
    let unsubscribe: () => void;
    if (docOrQuery.type === 'document') {
      unsubscribe = onSnapshot(docOrQuery as DocumentReference, {
        next(doc) {
          console.log(doc);
          const updatedData = { id: doc.id, ...doc.data() };
          setData(updatedData as unknown as T);
          setIsLoading(false);
          setError(null);
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
