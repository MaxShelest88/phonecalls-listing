import axios, { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

// TODO: типизировать

export const useAxios = (config: AxiosRequestConfig) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.request(config);
      setData(data.results);
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

  useEffect(() => {
    fetchPosts();
  }, []);

	return { data, error, isLoading };
};
