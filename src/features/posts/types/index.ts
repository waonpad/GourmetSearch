import type { FieldValue } from 'firebase/firestore';

export type Post = {
  body: string;
  authorId: string;
  createdAt: FieldValue;
};
