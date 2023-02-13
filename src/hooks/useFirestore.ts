import { useEffect, useState } from 'react';

import { onSnapshot } from 'firebase/firestore';
import { useErrorHandler } from 'react-error-boundary';

import type { Query, DocumentData } from 'firebase/firestore';

export const useFirestore = (query: Query<DocumentData>) => {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(query, {
      next(snapshot) {
        const updatedDocs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDocs(updatedDocs);
        setIsLoading(false);
      },
      error(error) {
        console.log(error);
        handleError(error);
      },
    });

    return unsubscribe;
  }, [handleError, query]);

  return { docs, isLoading };
};
