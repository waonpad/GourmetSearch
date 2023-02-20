import { useFireStorage } from '@/hooks/useFireStorage';

import { File } from './File';

export const Files = () => {
  const files = useFireStorage('files');

  return (
    <>
      {files.data.map((file) => (
        <File key={file?.name} file={file} />
      ))}
    </>
  );
};
