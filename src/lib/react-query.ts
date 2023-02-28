import { QueryClient } from 'react-query';

import type { AxiosError } from 'axios';
import type { UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query';
import type { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    // refetchOnMount: false, // ページ遷移から戻ってきたときにリクエストするか
    refetchOnWindowFocus: false,
    retry: false,
    // suspense: true, // reactのsuspenseに対応させられる
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;
