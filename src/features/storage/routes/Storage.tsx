import { ContentLayout } from '@/components/Layout';

import { Files } from '../components/Files';
import { UploadFile } from '../components/UploadFile';

export const Storage = () => {
  return (
    <ContentLayout title="Storage">
      <UploadFile />
      <Files />
    </ContentLayout>
  );
};
