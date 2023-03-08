import { ThumbUpIcon } from '@heroicons/react/outline';

import { Button } from '@/components/Elements';

import { useLikeGameClip } from '../api/likeGameClip';

import type { GameClip } from '../types';

type LikeGameClipProps = {
  data: GameClip;
};

export const LikeGameClip = ({ data }: LikeGameClipProps) => {
  const likeGameClipMutation = useLikeGameClip({ data });

  return (
    <Button
      isLoading={likeGameClipMutation.isLoading}
      type="button"
      className="bg-blue-600"
      onClick={() => likeGameClipMutation.mutateBatch()}
    >
      <ThumbUpIcon className="w-5 h-5 mr-2" aria-hidden="true" />
      Like
    </Button>
  );
};
