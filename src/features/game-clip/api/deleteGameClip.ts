import type { GameClip } from '../types';

export type DeleteGameClipDTO = {
  id: string;
};

type UseDeleteGameClipOptions = {
  config?: {
    // ...
  };
};

export const useDeleteGameClip = ({ config }: UseDeleteGameClipOptions = {}) => {
  return // ...
};
