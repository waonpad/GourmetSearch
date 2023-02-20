import { useFirestoreDeletion } from '@/hooks/useFireStorageDeletion';

import type { FullMetadata } from 'firebase/storage';

export const File = ({ file }: { file: FullMetadata & { downloadUrl: string } }) => {
  const fireStorageDeletion = useFirestoreDeletion();

  const handleDeleteFile = () => {
    if (file) {
      fireStorageDeletion.mutate(
        `files/${file?.name}`,
        () => console.log('File deleted successfully'),
        () => console.error
      );
    }
  };

  return (
    <>
      {file && file.contentType?.startsWith('image/') && <img src={file.downloadUrl} alt="File" />}
      {file && file.contentType?.startsWith('video/') && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={file.downloadUrl} controls />
      )}
      {file && <button onClick={handleDeleteFile}>delete</button>}
    </>
  );
};
