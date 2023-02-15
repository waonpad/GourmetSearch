import { query, orderBy, collectionGroup } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { Post } from '../types';

export const usePosts = () => {
  const posts = useFirestore<Post[]>(
    query(collectionGroup(db, 'posts'), orderBy('createdAt', 'desc'))
  );

  return posts;
};
