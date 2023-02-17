import { default as dayjs } from 'dayjs';

import type { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

export const formatDate = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');
export const timestampToDate = (timestamp: Timestamp) => timestamp.toDate();

export const formatDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const docData = { id: doc.id, ...doc.data() } as any;

  'createdAt' in doc.data() &&
    (docData.createdAt = formatDate(timestampToDate(doc.data().createdAt)));
  'updatedAt' in doc.data() &&
    (docData.updatedAt = formatDate(timestampToDate(doc.data().updatedAt)));
  return docData;
};
