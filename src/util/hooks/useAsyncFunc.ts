"use client";

import { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useAsyncFunc = <F, E = AxiosError>(
  func: (...args: any[]) => Promise<any>
) => {
  const [error, setError] = useState<E | undefined>(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState<unknown>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const execute = useCallback(
    (...args: any[]) => {
      return new Promise((resolve, reject) => {
        setisLoading(true);
        setError(undefined);
        setData(undefined);
        setSuccess(false);
        func(...args)
          .then((data) => {
            setData(data);
            setError(undefined);
            setSuccess(true);
            resolve(data);
          })
          .catch((error) => {
            setData(undefined);
            setError(error);
            reject(error);
            setSuccess(false);
          })
          .finally(() => {
            setisLoading(false);
          });
      });
    },
    [func]
  );

  return { execute: execute as unknown as F, error, isLoading, data, success };
};
