import { useEffect } from 'react';

import * as z from 'zod';

import { Form, InputField, TextAreaField } from '@/components/Form';
import { isTweetUrl } from '@/utils/twitter';

import { useCreateTwitterGameClip } from '../api/createTwitterGameClip';

import type { CreateTwitterGameClipInput } from '../api/createTwitterGameClip';

type CreateTwitterGameClipProps = {
  handleSuccess: () => void;
  handleLoading: (loading: boolean) => void;
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
  tweetUrl: z.string().refine(isTweetUrl, 'Invalid TweetUrl'),
});

export const CreateTwitterGameClip = ({
  handleSuccess,
  handleLoading,
}: CreateTwitterGameClipProps) => {
  const createGameClipMutation = useCreateTwitterGameClip();

  useEffect(() => {
    if (createGameClipMutation.isSuccess) {
      handleSuccess();
    }
  }, [createGameClipMutation.isSuccess, handleSuccess]);

  useEffect(() => {
    handleLoading(createGameClipMutation.isLoading);
  }, [createGameClipMutation.isLoading, handleLoading]);

  return (
    <Form<CreateTwitterGameClipInput['data'], typeof schema>
      id="create-game-clip"
      onSubmit={(values) => {
        createGameClipMutation.mutateDTO({ data: values });
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <TextAreaField
            label="Body"
            error={formState.errors['body']}
            registration={register('body')}
          />
          <TextAreaField
            label="TweetUrl"
            error={formState.errors['tweetUrl']}
            registration={register('tweetUrl')}
          />
        </>
      )}
    </Form>
  );
};
