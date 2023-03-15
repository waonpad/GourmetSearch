import { ContentLayout } from '@/components/Layout';

import { CreateGameClip } from '../components/CreateGameClip';
import { LikedGameClipList } from '../components/LikedGameClipList';

export const LikedGameClips = () => {
  return (
    <ContentLayout title="Liked GameClips">
      <div className="flex justify-end">
        <CreateGameClip />
      </div>
      <div className="mt-4">
        <LikedGameClipList />
      </div>
    </ContentLayout>
  );
};
