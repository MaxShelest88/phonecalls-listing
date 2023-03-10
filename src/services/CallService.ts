import { ICallList } from '../models/ICallList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const callApi = createApi({
  reducerPath: 'callApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
  tagTypes: ['Call'],
  endpoints: (build) => ({
    fetchAllCalls: build.query<ICallList, string>({
      query: (token) => ({
        url: '',
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      }),
    }),
  }),
});
