import { FallbackWrapper } from '@/components/FallbackWrapper';

import { GourmetSearchAPIFormView } from './GourmetSearchAPIForm.view';

import type { GourmetSearchAPIFormProps } from './GourmetSearchAPIForm.types';

/**
 * エラー画面まだ作っていない
 */
export const GourmetSearchAPIForm = (props: GourmetSearchAPIFormProps) => {
  return (
    <FallbackWrapper>
      <GourmetSearchAPIFormView {...props} />
    </FallbackWrapper>
  );
};
