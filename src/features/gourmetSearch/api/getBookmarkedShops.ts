import { useEffect, useState } from 'react';

import { collection, doc, getDoc } from 'firebase/firestore';
import _ from 'lodash';

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

const defaultBookmarkShopsConfig: UseBookmarkedShopsOptions['config'] = {
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
};

export const useBookmarkedShops = ({ config, userId }: UseBookmarkedShopsOptions) => {
  const userRef = doc(db, 'users', userId);

  const [isExistUser, setIsExistuser] = useState(true);

  const mergedConfig = _.merge({}, defaultBookmarkShopsConfig, config);

  const bookmarkedShops = useFirestore<BookmarkedShop[]>({
    ...mergedConfig,
    target: collection(userRef, 'bookmarkedShops'),
  });

  useEffect(() => {
    const checkUserRef = async () => {
      const userRefDoc = await getDoc(userRef);
      setIsExistuser(userRefDoc.exists());
    };
    checkUserRef();
  }, [userRef]);

  return {
    ...bookmarkedShops,
    isExistUser,
  };
};
