import { useParams } from 'react-router-dom';

import qs from 'qs';

import { ContentLayout } from '@/components/Layout';

import { CreateGameClip } from '../components/CreateGameClip';
import { GameClipList } from '../components/GameClipList';

export const GameClips = () => {
  const { query } = useParams();

  const parsedQuery = qs.parse(query);

  return (
    <ContentLayout title="GameClips">
      <div className="flex justify-end">
        <CreateGameClip />
      </div>
      <div className="mt-4">
        <GameClipList
          config={{
            query: Object.keys(parsedQuery).length > 0 ? parsedQuery : undefined,
          }}
        />
      </div>
    </ContentLayout>
  );
};
