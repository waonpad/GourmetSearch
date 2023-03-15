import { Spinner } from '@/components/Elements';

import { useLikedGameClips } from '../api/getLikedGameClips';

import { LikedGameClipListItem } from './LikedGameClipListItem';

import type { UseLikedGameClipsOptions } from '../api/getLikedGameClips';

type LikedGameClipsListProps = UseLikedGameClipsOptions;

export const LikedGameClipList = ({ config }: LikedGameClipsListProps) => {
  const likedGameClipssQuery = useLikedGameClips({ config });

  if (likedGameClipssQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!likedGameClipssQuery.data) return null;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {likedGameClipssQuery.data.map((data) => (
          <LikedGameClipListItem key={data.id} likedData={data} />
        ))}
      </div>
    </>
  );
};
