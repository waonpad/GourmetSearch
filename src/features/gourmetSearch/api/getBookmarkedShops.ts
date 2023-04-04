import { useEffect, useState } from 'react';

import { collection, doc, getDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { CustomQuery } from '@/hooks/useFirestore';
import { useFirestore } from '@/hooks/useFirestore';

import type { BookmarkedShop } from '../types';

export type UseBookmarkedShopsOptions = {
  userId: string;
  config?: {
    query?: Omit<CustomQuery<BookmarkedShop>, 'target' | 'type'>;
  };
};

const DEFAULT_OPTIONS: UseBookmarkedShopsOptions = {
  userId: '',
  config: {
    query: {
      orderBy: [
        {
          field: 'createdAt',
          direction: 'desc',
        },
      ],
      // limit: {
      //   limit: 10,
      // },
    },
  },
};

export const useBookmarkedShops = ({ config, userId }: UseBookmarkedShopsOptions) => {
  const userRef = doc(db, 'users', userId);

  const [userIsExist, setUserIsExist] = useState(true);

  const bookmarkedShops = useFirestore<BookmarkedShop[]>({
    target: collection(userRef, 'bookmarkedShops'),
    where: [...(DEFAULT_OPTIONS.config?.query?.where ?? []), ...(config?.query?.where ?? [])],
    orderBy: [...(DEFAULT_OPTIONS.config?.query?.orderBy ?? []), ...(config?.query?.orderBy ?? [])],
    start: config?.query?.start ?? DEFAULT_OPTIONS.config?.query?.start,
    end: config?.query?.end ?? DEFAULT_OPTIONS.config?.query?.end,
    limit: config?.query?.limit ?? DEFAULT_OPTIONS.config?.query?.limit,
  });

  useEffect(() => {
    const checkUserRef = async () => {
      const userRefDoc = await getDoc(userRef);
      setUserIsExist(userRefDoc.exists());
    };
    checkUserRef();
  }, [userRef]);

  return {
    ...bookmarkedShops,
    userIsExist,
  };
};
