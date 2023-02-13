import type { FieldValue } from 'firebase/firestore';

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type FireBaseEntity = {
  id: string;
  createdAt: FieldValue;
};
