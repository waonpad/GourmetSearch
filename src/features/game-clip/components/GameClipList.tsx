import { Spinner } from '@/components/Elements';

import { useGameClips } from '../api/getGameClips';

import { GameClipListItem } from './GameClipListItem';

export const GameClipList = () => {
  const GameClipsQuery = useGameClips();

  if (GameClipsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!GameClipsQuery.data) return null;

  return (
    <>
      {GameClipsQuery.data.map((data) => (
        <GameClipListItem key={data.id} data={data} />
      ))}
    </>
  );
};
