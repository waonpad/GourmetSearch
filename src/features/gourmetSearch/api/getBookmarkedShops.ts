import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import _ from 'lodash';

import { db } from '@/config/firebase';
import type { User } from '@/features/users';
import { useFirestore } from '@/hooks/useFirestore';

import { FEATURE_CONSTANTS } from '../constants';

export type UseBookmarkedShopsOptions = {
  userId: string;
  config?: {
    start?: number;
    count?: number;
    reverse?: boolean;
  };
};

export const useBookmarkedShops = ({ config, userId }: UseBookmarkedShopsOptions) => {
  const userRef = doc(db, 'users', userId);

  const [isExistUser, setIsExistuser] = useState(true);

  const targetUserDoc = useFirestore<User>(userRef);

  const sliceStart =
    (config?.start ?? FEATURE_CONSTANTS.GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_START) - 1;
  const sliceCount = config?.count ?? FEATURE_CONSTANTS.GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_COUNT;

  const bookmarkedShops = _.slice(
    targetUserDoc.data?.bookmarkedShops,
    sliceStart,
    sliceStart + sliceCount
  );

  useEffect(() => {
    const checkUserRef = async () => {
      const userRefDoc = await getDoc(userRef);
      setIsExistuser(userRefDoc.exists());
    };
    checkUserRef();
  }, [userRef]);

  return {
    ...targetUserDoc,
    data: config?.reverse ? _.reverse(bookmarkedShops) : bookmarkedShops,
    totalCount: targetUserDoc.data?.bookmarkedShops.length,
    isExistUser,
  };
};
