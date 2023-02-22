import type { FireBaseEntity } from '@/types';

import type { DocumentData, DocumentReference } from 'firebase/firestore';
import type { FullMetadata } from 'firebase/storage';

export type MediaPost = {
  body: string;
  files: Partial<MediaData>[];
  author: DocumentReference<DocumentData>;
} & FireBaseEntity;

export type MediaData = FullMetadata & { downloadUrl: string };
