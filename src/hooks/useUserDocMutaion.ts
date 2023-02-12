import { useEffect, useState } from 'react';

import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, collection } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { RoleTypes } from '@/lib/fireAuthorization';

import type { User } from 'firebase/auth';
import type { DocumentReference, DocumentData } from 'firebase/firestore';

type UserDoc = {
  displayName: string | null | undefined;
  email: string | null | undefined;
  role: RoleTypes;
};

export const useUserDocMutation = (user: User | null) => {
  const [userRef, setUserRef] = useState<DocumentReference<DocumentData>>();
  const userDocMutation = useFirestoreDocumentMutation(userRef as DocumentReference<DocumentData>);

  useEffect(() => {
    if (user) {
      setUserRef(doc(collection(db, 'users'), user?.uid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const init = () => {
    const data: UserDoc = {
      displayName: user?.displayName,
      email: user?.email,
      role: 'USER',
    };

    userDocMutation.mutate(data);
  };

  return {
    init,
  };
};
