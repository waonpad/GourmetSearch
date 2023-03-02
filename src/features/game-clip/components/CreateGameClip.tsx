import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';

import { useCreateSiteGameClip } from '../api/createSiteGameClip';

import type { CreateSiteGameClipInput } from '../api/createSiteGameClip';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

// テスト用にsiteからのみ作成できるようにしている

export const CreateGameClip = () => {
  const createGameClipMutation = useCreateSiteGameClip();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    createGameClipMutation.fireStorageMutation.setFile(event.target.files, index);
  };

  return (
    <FormDrawer
      isDone={createGameClipMutation.isSuccess}
      triggerButton={
        <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
          Create GameClip
        </Button>
      }
      title="Create GameClip"
      submitButton={
        <Button
          form="create-game-clip"
          type="submit"
          size="sm"
          isLoading={createGameClipMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<CreateSiteGameClipInput['data'], typeof schema>
        id="create-game-clip"
        onSubmit={(values) => {
          createGameClipMutation.mutateTSX({ data: values });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div>
              <input type="file" onChange={(event) => handleChangeFile(event, 0)} />
              <span>
                {createGameClipMutation.fireStorageMutation.error &&
                  createGameClipMutation.fireStorageMutation.error.message}
              </span>
              <span>
                {createGameClipMutation.fireStorageMutation.files[0] &&
                  createGameClipMutation.fireStorageMutation.files[0].error?.message}
              </span>
            </div>
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
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
