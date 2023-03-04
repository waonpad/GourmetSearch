import { useEffect, useRef, useState } from 'react';

import { igdbClient } from '@/lib/igdb-api-node';

type SearchGameQuery = {
  name?: string;
  filter?: string;
};

type SearchGameOptions = {
  fields?: string[];
  limit?: number;
  offset?: number;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  endpoint?: string;
};

const DEFAULT_FIELDS = ['id'];
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;
const DEFAULT_ENDPOINT = 'games';

export const useIgdbApi = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const prevSearchArgs = useRef<string | null>(null);

  useEffect(() => {
    console.log('Got games', data);
  }, [data]);

  const search = async (query: SearchGameQuery, options?: SearchGameOptions) => {
    const searchArgs = JSON.stringify({ query, options });
    if (prevSearchArgs.current === searchArgs) {
      console.log('Search args are the same, skipping');
      return;
    }
    prevSearchArgs.current = searchArgs;

    setIsLoading(true);
    const instance = igdbClient
      .fields(options?.fields || DEFAULT_FIELDS)
      .offset(options?.offset || DEFAULT_OFFSET)
      .limit(options?.limit || DEFAULT_LIMIT);

    query.name
      ? instance.search(query.name)
      : options?.sort
      ? instance.sort(options.sort.field, options.sort.direction)
      : null;

    query.filter && instance.where(query.filter);

    const response = await instance.request(`/${options?.endpoint || DEFAULT_ENDPOINT}`);

    if (response.status === 200) {
      setData(response.data);
      setIsLoading(false);

      return {
        data: response.data,
        error: null,
      };
    } else {
      setError(new Error(response.statusText));
      setIsLoading(false);

      return {
        data: null,
        error: new Error(response.statusText),
      };
    }
  };

  return {
    data,
    isLoading,
    error,
    search,
  };
};
