import { default as dayjs } from 'dayjs';
import {
  endAt,
  endBefore,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';

import type { CustomQuery } from '@/hooks/useFirestore';

import type { Timestamp, DocumentData, QueryDocumentSnapshot, FieldPath } from 'firebase/firestore';

export const formatDate = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');
export const timestampToDate = (timestamp: Timestamp) => {
  return timestamp ? timestamp.toDate() : new Date(0);
};

export const formatDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  const formatedData = { id: doc.id, ...data } as any;

  'createdAt' in data && (formatedData.createdAt = timestampToDate(data.createdAt));
  'updatedAt' in data && (formatedData.updatedAt = timestampToDate(data.updatedAt));
  return formatedData;
};

export const formatCustomQuery = <T>(customQuery: CustomQuery<T extends (infer U)[] ? U : T>) => {
  const whereConstraints =
    customQuery.where?.map((whereConfig) =>
      where(whereConfig.field as string | FieldPath, whereConfig.operator, whereConfig.value)
    ) ?? [];

  const orderByConstraints =
    customQuery.orderBy?.map((orderByConfig) =>
      orderBy(orderByConfig.field as string | FieldPath, orderByConfig.direction)
    ) ?? [];

  const startConstrains = customQuery.start
    ? customQuery.start.cursor === 'at'
      ? [startAt(...customQuery.start.value)]
      : [startAfter(...customQuery.start.value)]
    : [];

  const endConstrains = customQuery.end
    ? customQuery.end.cursor === 'at'
      ? [endAt(...customQuery.end.value)]
      : [endBefore(...customQuery.end.value)]
    : [];

  const limitConstraints = customQuery.limit
    ? customQuery.limit.toLast
      ? [limitToLast(customQuery.limit.limit)]
      : [limit(customQuery.limit.limit)]
    : [];

  const formatedQuery = query(
    customQuery.target,
    ...whereConstraints,
    ...orderByConstraints,
    ...startConstrains,
    ...endConstrains,
    ...limitConstraints
  );

  return formatedQuery;
};
