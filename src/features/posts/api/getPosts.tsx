import { collection, query, orderBy } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { Post } from '../types';

export const usePosts = () => {
  const { docs, isLoading } = useFirestore(
    query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
  );

  const posts = docs as Post[];

  return {
    posts,
    isLoading,
  };
};
