import type { FireBaseEntity } from '@/types';

import type { DocumentData, DocumentReference } from 'firebase/firestore';

export type MediaPost = {
  body: string;
  author: DocumentReference<DocumentData>;
} & FireBaseEntity;
