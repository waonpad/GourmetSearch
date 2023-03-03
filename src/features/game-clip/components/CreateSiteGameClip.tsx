import { useEffect } from 'react';

import * as z from 'zod';

import { Form, InputField, TextAreaField } from '@/components/Form';

import { useCreateSiteGameClip } from '../api/createSiteGameClip';

import type { CreateSiteGameClipInput } from '../api/createSiteGameClip';

type CreateSiteGameClipProps = {
  handleSuccess: () => void;
  handleLoading: (loading: boolean) => void;
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export const CreateSiteGameClip = ({ handleSuccess, handleLoading }: CreateSiteGameClipProps) => {
  const createGameClipMutation = useCreateSiteGameClip();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    createGameClipMutation.fireStorageMutation.setFile(event.target.files, index);
  };

  useEffect(() => {
    if (createGameClipMutation.isSuccess) {
      handleSuccess();
    }
  }, [createGameClipMutation.isSuccess, handleSuccess]);

  useEffect(() => {
    handleLoading(createGameClipMutation.isLoading);
  }, [createGameClipMutation.isLoading, handleLoading]);

  return (
    <Form<CreateSiteGameClipInput['data'], typeof schema>
      id="create-game-clip"
      onSubmit={(values) => {
        createGameClipMutation.mutateTSX({ data: values });
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

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-blue-300 group">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l7-7m-7 7V19m0 0a9 9 0 100 18 9 9 0 000-18z"
                  ></path>
                </svg>
                <p className="lowercase text-sm text-gray-400 group-hover:text-blue-600 pt-1 tracking-wider font-medium">
                  Select a Video
                </p>

                {createGameClipMutation.fireStorageMutation.files[0]?.file && (
                  <p className="text-sm text-gray-400 group-hover:text-blue-600 pt-1 tracking-wider font-medium">
                    {createGameClipMutation.fireStorageMutation.files[0].file?.name}
                  </p>
                )}
                {createGameClipMutation.fireStorageMutation.files[0]?.error && (
                  <p className="text-sm text-red-400 group-hover:text-red-600 pt-1 tracking-wider font-medium">
                    {createGameClipMutation.fireStorageMutation.files[0].error.message}
                  </p>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(event) => handleChangeFile(event, 0)}
              />
            </label>
          </div>
        </>
      )}
    </Form>
  );
};
