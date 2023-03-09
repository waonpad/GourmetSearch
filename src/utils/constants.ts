import { serverTimestamp } from 'firebase/firestore';

export const timestampTemp = {
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
};
