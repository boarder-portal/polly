import { useState } from 'react';

import { AnyAsyncValue } from 'client/types/async';

import useImmutableCallback from 'client/hooks/useImmutableCallback';

export type UsePromise<T> = AnyAsyncValue<T> & {
  run(): Promise<T>;
};

export default function usePromise<T>(getPromise: () => Promise<T>): UsePromise<T> {
  const [promiseValue, setPromiseValue] = useState<AnyAsyncValue<T>>({
    value: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  return {
    ...promiseValue,
    run: useImmutableCallback(async () => {
      try {
        setPromiseValue({
          value: null,
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: null,
        });

        const result = await getPromise();

        setPromiseValue({
          value: result,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        });

        return result;
      } catch (err) {
        setPromiseValue({
          value: null,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: err,
        });

        throw err;
      }
    }),
  };
}
