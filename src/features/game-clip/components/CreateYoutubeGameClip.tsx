import { useEffect } from 'react';

import * as z from 'zod';

import { Form, InputField, TextAreaField } from '@/components/Form';
import { isYouTubeVideoUrl } from '@/utils/youtube';

import { useCreateYoutubeGameClip } from '../api/createYoutubeGameClip';

import type { CreateYoutubeGameClipInput } from '../api/createYoutubeGameClip';

type CreateYoutubeGameClipProps = {
  handleSuccess: () => void;
  handleLoading: (loading: boolean) => void;
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
  videoUrl: z.string().refine(isYouTubeVideoUrl, 'Invalid VideoUrl'),
});

export const CreateYoutubeGameClip = ({
  handleSuccess,
  handleLoading,
}: CreateYoutubeGameClipProps) => {
  const createGameClipMutation = useCreateYoutubeGameClip();

  useEffect(() => {
    if (createGameClipMutation.isSuccess) {
      handleSuccess();
    }
  }, [createGameClipMutation.isSuccess, handleSuccess]);

  useEffect(() => {
    handleLoading(createGameClipMutation.isLoading);
  }, [createGameClipMutation.isLoading, handleLoading]);

  return (
    <Form<CreateYoutubeGameClipInput['data'], typeof schema>
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
            label="VideoUrl"
            error={formState.errors['videoUrl']}
            registration={register('videoUrl')}
          />
        </>
      )}
    </Form>
  );
};
