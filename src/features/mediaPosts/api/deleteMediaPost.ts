import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireStorageDeletion } from '@/hooks/useFireStorageDeletion';

import type { MediaPost } from '../types';

export const useDeleteMediaPost = (mediaPost: MediaPost) => {
  const deleteMediaPostMutaion = useFirestoreDocumentDeletion(
    doc(db, 'users', mediaPost.author.path.split('/')[1], 'mediaPosts', mediaPost.id)
  );

  const fireStorageDeletion = useFireStorageDeletion();

  const deleteWithStorage = () => {
    const file = mediaPost.file;

    console.log('投稿の削除を実行する');

    deleteMediaPostMutaion.mutate(undefined, {
      onSuccess: () => {
        console.log('ファイルの削除を実行する');
        // したいが、できない(コンポーネントが既に消えているため)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fireStorageDeletion.mutate(file.fullPath!, {
          onSuccess: () => {
            console.log('ファイル削除成功');
          },
          onError: () => {
            console.error('ファイル削除失敗');
          },
        });
      },
    });
  };

  return {
    ...deleteMediaPostMutaion,
    deleteWithStorage,
  };
};
