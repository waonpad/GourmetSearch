import { useEffect, useState } from 'react';

import { onSnapshot } from 'firebase/firestore';

import { formatDoc, formatCustomQuery } from '../utils/format';

import type {
  Query,
  DocumentReference,
  DocumentData,
  FirestoreError,
  OrderByDirection,
  WhereFilterOp,
  FieldPath,
} from 'firebase/firestore';

export type CustomQuery<T> = {
  type?: 'collection' | 'collectionGroup';
  target: Query<DocumentData>;
  where?: {
    field: FieldPath | keyof T;
    operator: WhereFilterOp;
    value: unknown;
  }[];
  orderBy?: {
    field: FieldPath | keyof T;
    direction: OrderByDirection;
  }[];
  start?: {
    cursor: 'at' | 'after';
    value: unknown[];
  };
  end?: {
    cursor: 'at' | 'before';
    value: unknown[];
  };
  limit?: {
    toLast?: boolean;
    limit: number;
  };
};

export const useFirestore = <T>(
  docOrQuery: CustomQuery<T extends Array<infer U> ? U : T> | DocumentReference | undefined
) => {
  const [firestore, setFirestore] = useState<{
    data: T | undefined;
    isLoading: boolean;
    error: FirestoreError | null;
  }>({
    data: undefined,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!docOrQuery) {
      return;
    }
    setFirestore((prev) => ({ ...prev, isLoading: true }));
    let unsubscribe: () => void;
    let initialLoad = true;
    if (docOrQuery.type === 'document') {
      unsubscribe = onSnapshot(docOrQuery as DocumentReference, {
        next(doc) {
          // if (doc.metadata.hasPendingWrites) {
          //   console.log('pending writes');
          //   return;
          // }

          if (doc.exists()) {
            const updatedData = formatDoc(doc) as unknown as T;
            setFirestore({ data: updatedData, isLoading: false, error: null });
          } else {
            setFirestore({
              data: undefined,
              isLoading: false,
              error: {
                code: 'not-found',
                message: 'Document does not exist',
                name: 'FirestoreError',
              },
            });
            unsubscribe;
          }
        },
        error(error) {
          setFirestore({ data: undefined, isLoading: false, error: error });
          unsubscribe;
        },
      });
    } else {
      const formatedQuery = formatCustomQuery<T>(docOrQuery);

      unsubscribe = onSnapshot(formatedQuery as Query<DocumentData>, {
        next(snapshot) {
          // if (snapshot.metadata.hasPendingWrites) {
          //   console.log('pending writes');
          //   return;
          // }

          if (initialLoad) {
            console.log('initial data loaded');
            initialLoad = false;
          } else {
            snapshot.docChanges().forEach((change) => {
              console.log(change.type, change.doc.id, change.doc.data());
            });
          }

          const updatedData = snapshot.docs.map((doc) => formatDoc(doc)) as unknown as T;
          setFirestore({ data: updatedData, isLoading: false, error: null });
        },
        error(error) {
          setFirestore({ data: undefined, isLoading: false, error: error });
          unsubscribe;
        },
      });
    }
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(docOrQuery)]);

  return firestore;
};

// Cloud Firestore は、論理 OR クエリを制限付きでサポートしています。in と array-contains-any 演算子は、
// フィールドが 1 つの等値（==）条件または array-contains 条件を最大 10 個まで含む論理 OR をサポートしています。
// それ以外の場合は、OR 条件ごとに個別にクエリを作成し、クエリの結果をアプリで結合します。

// 複合クエリにおいて、範囲（<、<=、>、>=）と不等値（!=、not-in）の比較は、すべて同一のフィールドに対するフィルタである必要があります。
// 1 つのクエリで使用できる array-contains 句は 1 つだけです。array-contains と array-contains-any を組み合わせることはできません。
// 1 つのクエリでは in、not-in、array-contains-any のいずれかの句を 1 回だけ使用できます。同じクエリ内で in、not-in、array-contains-any を組み合わせることはできません。
// 等値（==）または in 句に含まれるフィールドでクエリを並べ替えることはできません。
// クエリ内のフィルタ、並べ替え順指定、親ドキュメント パス（サブコレクションの場合は 1、ルート コレクションの場合は 0）の数の合計は、100 を超えることはできません。

// != クエリ /////////////////////////////////////////////////////////////////////////
// 指定したフィールドが存在するドキュメントのみがクエリにマッチングされます。
// 複合クエリで not-in と != を組み合わせることはできません。
// 複合クエリにおいて、範囲（<、<=、>、>=）と不等値（!=、not-in）の比較は、すべて同一のフィールドに対するフィルタである必要があります。

// in、not-in、array-contains-any /////////////////////////////////////////////////////////////////////////
// in、not-in、array-contains-any は最大 10 個の比較値をサポートします。
// 1 つのクエリで使用できる array-contains 句は 1 つだけです。array-contains と array-contains-any を組み合わせることはできません。
// 1 つのクエリでは in、not-in、array-contains-any のいずれかの句を 1 回だけ使用できます。同じクエリ内でこれらの演算子を組み合わせることはできません。
// not-in と不等値 != を組み合わせることはできません。
// 等値（==）または in 句に含まれるフィールドでクエリを並べ替えることはできません。

// orderBy() /////////////////////////////////////////////////////////////////////////
// orderBy() 句は、指定したフィールドの有無によるフィルタも行います。指定したフィールドがないドキュメントは結果セットには含まれません。
// 範囲比較（<、<=、>、>=）のフィルタを含める場合、最初の並べ替えは同じフィールドで行う必要があります。

// MEMO /////////////////////////////////////////////////////////////////////////
// whereで範囲検索する場合、最初のorderByで指定した(する)フィールドで範囲検索する必要がある
// つまり、範囲検索は1つのフィールドでしかできない

// 参考
// https://firebase.google.com/docs/firestore/query-data/queries?hl=ja
