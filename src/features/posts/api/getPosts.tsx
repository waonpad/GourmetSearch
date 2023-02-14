// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';

import { query, orderBy, collectionGroup } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { Post } from '../types';

// export const usePosts = () => {
//   const posts = useFirestore<Post[]>(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));

//   useEffect(() => {
//     console.log(posts);
//   }, [posts]);

//   return posts;
// };

export const usePosts = () => {
  const posts = useFirestore<Post[]>(
    query(collectionGroup(db, 'posts'), orderBy('createdAt', 'desc'))
  );

  return posts;
};
