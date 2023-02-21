import { query, orderBy, collectionGroup } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { MediaPost } from '../types';

export const useMediaPosts = () => {
  const mediaPosts = useFirestore<MediaPost[]>(
    query(collectionGroup(db, 'mediaPosts'), orderBy('createdAt', 'desc'))
  );

  return mediaPosts;
};
