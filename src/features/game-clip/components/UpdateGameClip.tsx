import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, TextAreaField } from '@/components/Form';

import { useGameClip } from '../api/getGameClip';
import { useUpdateGameClip } from '../api/updateGameClip';

import type { UpdateGameClipDTO } from '../api/updateGameClip';

type UpdateGameClipProps = {
  gameClipId: string;
};

const schema = z.object({
  body: z.string().min(1, 'Required'),
});

export const UpdateGameClip = ({ gameClipId }: UpdateGameClipProps) => {
  const gameClipQuery = useGameClip({ id: gameClipId });
  const updateGameClipMutation = useUpdateGameClip();

  return (
    <FormDrawer
      isDone={updateGameClipMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update GameClip
        </Button>
      }
      title="Update GameClip"
      submitButton={
        <Button
          form="update-game-clip"
          type="submit"
          size="sm"
          isLoading={updateGameClipMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateGameClipDTO['data'], typeof schema>
        id="update-game-clip"
        onSubmit={(values) => {
          updateGameClipMutation.mutate({ data: values, gameClipId });
        }}
        options={{
          defaultValues: {
            body: gameClipQuery.data?.body,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <TextAreaField
              label="Body"
              error={formState.errors['body']}
              registration={register('body')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
