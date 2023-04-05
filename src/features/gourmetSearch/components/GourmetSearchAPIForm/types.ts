import type { CustomizedHotpepperGourmetSearchAPIRequest } from '../../types';

export type GourmetSearchAPIFormProps = {
  defaultValues?: CustomizedHotpepperGourmetSearchAPIRequest;
};

export type GourmetSearchAPIFormInput = {
  keyword?: CustomizedHotpepperGourmetSearchAPIRequest['keyword'];
  range?: CustomizedHotpepperGourmetSearchAPIRequest['range'] | 0;
};
