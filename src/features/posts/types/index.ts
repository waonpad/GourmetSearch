import type { FireBaseEntity } from '@/types';

import type { DocumentData, DocumentReference } from 'firebase/firestore';

export type Post = {
  body: string;
  author: DocumentReference<DocumentData>;
} & FireBaseEntity;
