import axios from 'axios';
import { useState, useEffect } from 'react';
import { ICall, ICallList } from '../models/ICallList';

export const useFetchCalls = (url: string, token: string) => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<ICallList>(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        },
      );
      setCalls(data.results);
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

  return { calls, error, isLoading };
};
