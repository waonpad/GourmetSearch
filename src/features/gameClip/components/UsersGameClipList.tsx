import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/Elements';

import { useUsersGameClips } from '../api/getUsersGameClips';

import { GameClipListItem } from './GameClipListItem';

import type { UseUsersGameClipsOptions } from '../api/getUsersGameClips';

type UsersGameClipsListProps = UseUsersGameClipsOptions;

export const UsersGameClipList = ({ config, userId }: UsersGameClipsListProps) => {
  const usersGameClipsQuery = useUsersGameClips({ config, userId });

  const navigate = useNavigate();

  useEffect(() => {
    if (!usersGameClipsQuery.userIsExist) {
      navigate('/404');
    }
  }, [usersGameClipsQuery.userIsExist, navigate]);

  if (usersGameClipsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!usersGameClipsQuery.data) return null;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {usersGameClipsQuery.data.map((data) => (
          <GameClipListItem key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};
