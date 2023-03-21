import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/Elements';

import { useLikedGameClips } from '../api/getLikedGameClips';

import { LikedGameClipListItem } from './LikedGameClipListItem';

import type { UseLikedGameClipsOptions } from '../api/getLikedGameClips';

type LikedGameClipsListProps = UseLikedGameClipsOptions;

export const LikedGameClipList = ({ config, userId }: LikedGameClipsListProps) => {
  const likedGameClipsQuery = useLikedGameClips({ config, userId });

  const navigate = useNavigate();

  useEffect(() => {
    if (!likedGameClipsQuery.userIsExist) {
      navigate('/404');
    }
  }, [likedGameClipsQuery.userIsExist, navigate]);

  if (likedGameClipsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!likedGameClipsQuery.data) return null;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {likedGameClipsQuery.data.map((data) => (
          <LikedGameClipListItem key={data.id} likedData={data} />
        ))}
      </div>
    </>
  );
};
