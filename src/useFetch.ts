import { useState, useEffect, useRef, useLayoutEffect } from 'react';

type FetchOptions<S> = {
  options: {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    token: string | null;
    onSuccess?: (...args: S[]) => void;
  };
};

const useCallbackRef = <Y>(callback: Y) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
};

export const useFetch = <T, S>({ options }: FetchOptions<S>) => {
  const [data, setData] = useState<T>();

  const savedOnSuccess = useCallbackRef<typeof options.onSuccess>(
    options.onSuccess,
  );

  useEffect(() => {
    const bearerHeader = options.token ? `Bearer ${options.token}` : null;

    const requestInit = {
      method: options.method,
      Authorization: bearerHeader,
    };

    fetch(options.url, requestInit)
      .then((response) => response.json())
      .then((json) => {
        savedOnSuccess.current?.();
        setData(json);
      });
  }, [options.url, options.method, options.token, savedOnSuccess]);

  console.log(data);

  return data as T;
};
