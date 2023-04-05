import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { GourmetSearchAPIFormInput } from './GourmetSearchAPIForm.types';

export const validationSchema: ReactHookFormValidationRules<GourmetSearchAPIFormInput> = {
  keyword: {},
  range: {
    required: validations.required,
    min: validations.min(0),
    max: validations.max(5),
  },
};
