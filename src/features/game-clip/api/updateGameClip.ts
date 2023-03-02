import type { GameClip } from '../types';

export type UpdateGameClipDTO = {
  id: string;
  data: {
    body: string;
  };
};

type UseUpdateGameClipOptions = {
  config?: {
    // ...
  };
};

export const useUpdateGameClip = ({ config }: UseUpdateGameClipOptions = {}) => {
  return // ...
};
