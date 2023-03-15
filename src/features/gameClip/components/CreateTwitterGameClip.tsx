import { useEffect } from 'react';

import * as z from 'zod';

import { AutoCompleteInputField } from '@/components/Elements/AutoCompleteInputField';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { useIgdbApi } from '@/hooks/useIgdbApi';
import { isTweetUrl } from '@/utils/twitter';

import { useCreateTwitterGameClip } from '../api/createTwitterGameClip';

import type { CreateTwitterGameClipInput } from '../api/createTwitterGameClip';

type CreateTwitterGameClipProps = {
  handleSuccess: () => void;
  handleLoading: (loading: boolean) => void;
};

const schema = z.object({
  gameTitle: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
  tweetUrl: z.string().refine(isTweetUrl, 'Invalid TweetUrl'),
});

export const CreateTwitterGameClip = ({
  handleSuccess,
  handleLoading,
}: CreateTwitterGameClipProps) => {
  const createGameClipMutation = useCreateTwitterGameClip();
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
    <Form<CreateTwitterGameClipInput['data'], typeof schema>
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
            label="TweetUrl"
            error={formState.errors['tweetUrl']}
            registration={register('tweetUrl')}
          />
        </>
      )}
    </Form>
  );
};
