import { ThumbUpIcon } from '@heroicons/react/outline';

import { Button } from '@/components/Elements';

import { useLikeGameClip } from '../api/likeGameClip';

import type { GameClip } from '../types';

type LikeGameClipProps = {
  data: GameClip;
  disabled?: boolean;
};

export const LikeGameClip = ({ data, disabled }: LikeGameClipProps) => {
  const likeGameClipMutation = useLikeGameClip({ data });

  const handleClickLIkeButton = () => {
    likeGameClipMutation.mutateToggle();
  };

  return (
    <Button
      disabled={disabled || !likeGameClipMutation.canMutate}
      isLoading={likeGameClipMutation.isLoading}
      type="button"
      className="bg-blue-600"
      onClick={handleClickLIkeButton}
    >
      <div className="flex items-center">
        <ThumbUpIcon className="w-5 h-5 mr-2" aria-hidden="true" />
        {data.likeCount}
      </div>
    </Button>
  );
};
