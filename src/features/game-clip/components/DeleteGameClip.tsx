import { TrashIcon } from '@heroicons/react/outline';

import { Button, ConfirmationDialog } from '@/components/Elements';

import { useDeleteGameClip } from '../api/deleteGameClip';

import type { GameClip } from '../types';

type DeleteGameClipProps = {
  data: GameClip;
};

export const DeleteGameClip = ({ data }: DeleteGameClipProps) => {
  const deleteGameClipMutation = useDeleteGameClip({ data });

  return (
    <ConfirmationDialog
      isDone={deleteGameClipMutation.isSuccess}
      icon="danger"
      title="Delete GameClip"
      body="Are you sure you want to delete this Game clip?"
      triggerButton={
        <button
          type="button"
          className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900 flex items-center"
          role="menuitem"
        >
          <TrashIcon className="w-5 h-5 mr-2" aria-hidden="true" />
          Delete
        </button>
      }
      confirmButton={
        <Button
          isLoading={deleteGameClipMutation.isLoading}
          type="button"
          className="bg-red-600"
          onClick={() => deleteGameClipMutation.mutate()}
        >
          Delete GameClip
        </Button>
      }
    />
  );
};
