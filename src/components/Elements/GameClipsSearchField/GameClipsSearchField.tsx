import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '@heroicons/react/outline';
import qs from 'qs';
import { z } from 'zod';

import { AutoCompleteInputField, Form } from '@/components/Form';
import type { GameClip } from '@/features/gameClip';
import type { CustomQuery } from '@/hooks/useFirestore';
import { useIgdbApi } from '@/hooks/useIgdbApi';

const schema = z.object({
  gameTitle: z.string().min(1, 'Required'),
});

type GameClipsSearchFieldOptions = {
  data: {
    gameTitle: string;
  };
};

export const GameClipsSearchField = () => {
  const navigate = useNavigate();
  const igdbGame = useIgdbApi();

  const handleChangeGameTitle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const gameTitle = event.currentTarget.value;

    if (gameTitle.length > 1) {
      igdbGame.search({ name: gameTitle }, { fields: ['id', 'name'] });
    }
  };

  const handleSubmit = (values: GameClipsSearchFieldOptions['data']) => {
    const query: Omit<CustomQuery<GameClip>, 'target' | 'type'> = {
      where: [
        {
          field: 'gameTitle',
          operator: '==',
          value: values.gameTitle,
        },
      ],
    };

    const queryString = qs.stringify(query);

    navigate(`./gameClips/search/${queryString}`);
  };

  return (
    <Form<GameClipsSearchFieldOptions['data'], typeof schema>
      id="search-game-clip"
      onSubmit={handleSubmit}
      schema={schema}
    >
      {({ register, setValue }) => (
        <div className="flex items-center">
          <div className="flex-shrink-1 w-full">
            <AutoCompleteInputField
              // error={formState.errors['gameTitle']}
              registration={{ ...register('gameTitle'), onChange: handleChangeGameTitle }}
              inputProps={{
                placeholder: 'Search',
              }}
              suggestions={igdbGame.data}
              suggestionValueKey="name"
              setValue={{ fn: setValue, name: 'gameTitle' }}
            />
          </div>
          <div className="mt-1">
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </Form>
  );
};
