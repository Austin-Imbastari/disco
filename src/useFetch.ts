import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type FetchOptions = {
  options: {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    token: string | null;
  };
};

export const useFetch = <T>({ options }: FetchOptions) => {
  const [items, setItems] = useState<T>();

  useEffect(() => {
    const bearerHeader = options.token ? `Bearer ${options.token}` : null;

    const requestInit = {
      method: options.method,
      Authorization: bearerHeader,
    };

    fetch(options.url, requestInit)
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
      });
  }, [options.url, options.method, options.token]);

  return {
    items,
  };
};

// setTimeout(() => {
//   options.setShouldShow(true);
// }, 500);
