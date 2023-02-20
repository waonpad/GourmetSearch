import { useState, useEffect } from 'react';

import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';

import { storage } from '@/config/firebase';

import type { FullMetadata } from 'firebase/storage';

export const useFireStorage = (path: string) => {
  const [fireStorage, setFireStorage] = useState<{
    data: (FullMetadata & { downloadUrl: string })[];
    error: Error | null;
    isLoading: boolean;
  }>({
    data: [],
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    console.log(fireStorage);
  }, [fireStorage]);

  useEffect(() => {
    setFireStorage({
      data: [],
      error: null,
      isLoading: true,
    });

    listAll(ref(storage, path))
      .then((res) => {
        res.items.forEach((itemRef) => {
          Promise.all([getMetadata(itemRef), getDownloadURL(itemRef)])
            .then(([metadata, downloadUrl]) => {
              const fileData = { ...metadata, downloadUrl: downloadUrl };
              console.log(fileData);

              setFireStorage((prevState) => ({
                ...prevState,
                data: [...prevState.data, fileData],
              }));
            })
            .catch((error) => {
              setFireStorage((prevState) => ({
                ...prevState,
                error: error,
                isLoading: false,
              }));
            });
        });
      })
      .catch((error) => {
        setFireStorage((prevState) => ({
          ...prevState,
          error: error,
          isLoading: false,
        }));
      });
  }, [path]);

  return fireStorage;
};
