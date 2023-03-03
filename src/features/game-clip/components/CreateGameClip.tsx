import { useState } from 'react';

import { PlusIcon } from '@heroicons/react/outline';

import { Button } from '@/components/Elements';
import { FormDrawer } from '@/components/Form';

import { CreateSiteGameClip } from './CreateSiteGameClip';
import { CreateTwitterGameClip } from './CreateTwitterGameClip';
import { CreateYoutubeGameClip } from './CreateYoutubeGameClip';

export const CreateGameClip = () => {
  const [activeForm, setActiveForm] = useState<'site' | 'twitter' | 'youtube'>('site');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActiveForm(event.currentTarget.value as 'site' | 'twitter' | 'youtube');
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    setIsLoading(false);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <FormDrawer
      isDone={isSuccess}
      triggerButton={
        <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
          Create GameClip
        </Button>
      }
      title="Create GameClip"
      submitButton={
        <Button form="create-game-clip" type="submit" size="sm" isLoading={isLoading}>
          Submit
        </Button>
      }
    >
      <div className="flex space-x-2">
        {['site', 'twitter', 'youtube'].map((type) => (
          <Button
            key={type}
            size="sm"
            value={type}
            onClick={handleChangeForm}
            className={activeForm === type ? 'bg-blue-800 mb-4' : 'mb-4'}
          >
            {type}
          </Button>
        ))}
      </div>
      {activeForm === 'site' && (
        <CreateSiteGameClip handleSuccess={handleSuccess} handleLoading={handleLoading} />
      )}
      {activeForm === 'twitter' && (
        <CreateTwitterGameClip handleSuccess={handleSuccess} handleLoading={handleLoading} />
      )}
      {activeForm === 'youtube' && (
        <CreateYoutubeGameClip handleSuccess={handleSuccess} handleLoading={handleLoading} />
      )}
    </FormDrawer>
  );
};
