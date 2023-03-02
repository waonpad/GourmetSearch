import { TrashIcon } from '@heroicons/react/outline';

import { Button, ConfirmationDialog } from '@/components/Elements';

import { useDeleteGameClip } from '../api/deleteGameClip';

type DeleteGameClipProps = {
  id: string;
};

export const DeleteGameClip = ({ id }: DeleteGameClipProps) => {
  const deleteGameClipMutation = useDeleteGameClip({ id });

  return (
    <ConfirmationDialog
      isDone={deleteGameClipMutation.isSuccess}
      icon="danger"
      title="Delete GameClip"
      body="Are you sure you want to delete this Game clip?"
      triggerButton={
        <Button variant="danger" size="sm" startIcon={<TrashIcon className="h-4 w-4" />}>
          Delete GameClip
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteGameClipMutation.isLoading}
          type="button"
          className="bg-red-600"
          onClick={() => deleteGameClipMutation.mutate({ id })}
        >
          Delete GameClip
        </Button>
      }
    />
  );
};
