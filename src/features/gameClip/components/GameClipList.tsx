import { Spinner } from '@/components/Elements';

import { useGameClips } from '../api/getGameClips';

import { GameClipListItem } from './GameClipListItem';

import type { UseGameClipsOptions } from '../api/getGameClips';

type GameClipListProps = UseGameClipsOptions;

export const GameClipList = ({ config }: GameClipListProps) => {
  const gameClipsQuery = useGameClips({ config });

  if (gameClipsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!gameClipsQuery.data) return null;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {gameClipsQuery.data.map((data) => (
          <GameClipListItem key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};
