import { ContentLayout } from '@/components/Layout';

import { CreateGameClip } from '../components/CreateGameClip';
import { GameClipList } from '../components/GameClipList';

export const GameClips = () => {
  return (
    <ContentLayout title="GameClips">
      <div className="flex justify-end">
        <CreateGameClip />
      </div>
      <div className="mt-4">
        <GameClipList />
      </div>
    </ContentLayout>
  );
};
