import { isNil } from "lodash";
import { useCallback } from "react";
import useSWR, {
  Key,
  SWRConfiguration,
  SWRResponse as SWRResponseInterface,
} from "swr";

export type SWRResponse<T, D> = SWRResponseInterface<T, D> & {
  isLoading: boolean;
};

export function useFetchData<T, D = Error>(
  key: Key,
  fetchFunc: (...args: any[]) => Promise<unknown>,
  config?: SWRConfiguration<T, D>,
  mapper?: (data: any) => T
): SWRResponse<T, D> {
  const fetcher = useCallback(
    async (...args: any[]) => {
      const response = await fetchFunc(...args);
      return (mapper ? mapper(response) : response) as Promise<T>;
    },
    [fetchFunc, mapper]
  );
  const swr = useSWR<T, D>(key, fetcher, config);

  return {
    ...swr,
    // isLoading has to do with the initial fetch request
    // isValidating will be set to true any time there is any refetching, on the initial request and on all the others requests
    // If null was passed to the hook the isLoading was set to true, even if no request was made
    isLoading: isSWRLoading(swr),
  };
}

export const isSWRLoading = (swr: SWRResponseInterface) => {
  return swr.isValidating ? !swr.error && isNil(swr.data) : false;
};
