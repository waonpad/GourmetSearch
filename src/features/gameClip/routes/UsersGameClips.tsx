import { useParams } from 'react-router-dom';

import { ContentLayout } from '@/components/Layout';

import { CreateGameClip } from '../components/CreateGameClip';
import { UsersGameClipList } from '../components/UsersGameClipList';

export const UsersGameClips = () => {
  const { userId } = useParams();

  return (
    <ContentLayout title="Users GameClips">
      <div className="flex justify-end">
        <CreateGameClip />
      </div>
      <div className="mt-4">
        <UsersGameClipList userId={userId} />
      </div>
    </ContentLayout>
  );
};
