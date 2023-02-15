import type { FireUser } from '../types';
import type {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export const fireUserValidator = (data: DocumentData) => {
  if (
    typeof data.id === 'string' &&
    typeof data.displayName === 'string' &&
    typeof data.email === 'string' &&
    ['ADMIN', 'USER'].includes(data.role)
  ) {
    return true;
  } else return false;
};

export const fireUserConverter: FirestoreDataConverter<FireUser> = {
  toFirestore(user: WithFieldValue<FireUser>): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FireUser {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      displayName: data.displayName,
      email: data.email,
      role: data.role,
    };
  },
};
