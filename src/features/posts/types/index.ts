import type { FireBaseEntity } from '@/types';

export type Post = {
  body: string;
  authorId: string;
} & FireBaseEntity;
