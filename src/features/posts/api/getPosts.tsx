// import { useEffect } from 'react';

import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, orderBy, query } from 'firebase/firestore';

import { db } from '@/config/firebase';

export const usePosts = () => {
  const { data, isLoading: isPostsLoading } = useFirestoreQuery(
    ['posts'],
    query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
    {
      subscribe: true,
    }
  );

  const posts = data?.docs;

  return {
    posts,
    isPostsLoading,
  };
};
