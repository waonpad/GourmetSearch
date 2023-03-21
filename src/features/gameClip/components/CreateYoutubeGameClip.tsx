import { useEffect } from 'react';

import * as z from 'zod';

import { Form, InputField, TextAreaField, AutoCompleteInputField } from '@/components/Form';
import { useIgdbApi } from '@/hooks/useIgdbApi';
import { isYoutubeVideoUrl } from '@/utils/youtube';

import { useCreateYoutubeGameClip } from '../api/createYoutubeGameClip';

import type { CreateYoutubeGameClipInput } from '../api/createYoutubeGameClip';

type CreateYoutubeGameClipProps = {
  handleSuccess: () => void;
  handleLoading: (loading: boolean) => void;
};

const schema = z.object({
  gameTitle: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
  videoUrl: z.string().refine(isYoutubeVideoUrl, 'Invalid VideoUrl'),
});

export const CreateYoutubeGameClip = ({
  handleSuccess,
  handleLoading,
}: CreateYoutubeGameClipProps) => {
  const createGameClipMutation = useCreateYoutubeGameClip();
  const igdbGame = useIgdbApi();

  useEffect(() => {
    if (createGameClipMutation.isSuccess) {
      handleSuccess();
    }
  }, [createGameClipMutation.isSuccess, handleSuccess]);

  useEffect(() => {
    handleLoading(createGameClipMutation.isLoading);
  }, [createGameClipMutation.isLoading, handleLoading]);

  const handleChangeGameTitle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const gameTitle = event.currentTarget.value;

    if (gameTitle.length > 1) {
      igdbGame.search({ name: gameTitle }, { fields: ['id', 'name'] });
    }
  };

  return (
    <Form<CreateYoutubeGameClipInput['data'], typeof schema>
      id="create-game-clip"
      onSubmit={(values) => {
        createGameClipMutation.mutateDTO({ data: values });
      }}
      schema={schema}
    >
      {({ register, formState, setValue }) => (
        <>
          <AutoCompleteInputField
            label="Game Title"
            error={formState.errors['gameTitle']}
            registration={{ ...register('gameTitle'), onChange: handleChangeGameTitle }}
            suggestions={igdbGame.data}
            suggestionValueKey="name"
            setValue={{ fn: setValue, name: 'gameTitle' }}
          />
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
