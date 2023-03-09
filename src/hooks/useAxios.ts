import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export const useAxios = <T>(
  config: AxiosRequestConfig,
  initilValue: T,
): [() => {}, T, boolean, string] => {
  const [data, setData] = useState<T>(initilValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // console.log(data);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.request<T>(config);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      let message: string;
      if (axios.isAxiosError(e) && e.response) {
        message = e.message;
        setError(message);
      } else {
        message = String(error);
        setError(message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, data, isLoading, error];
};
