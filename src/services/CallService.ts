import { ICallList } from '../models/ICallList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const callApi = createApi({
  reducerPath: 'callApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.skilla.ru/mango/getList' }),
  tagTypes: ['Call'],
  endpoints: (build) => ({
    fetchAllCalls: build.query<ICallList, unknown>({
      query: () => ({
        url: '',
        method: 'POST',
        headers: { Authorization: 'Bearer testtoken' },
      }),
    }),
  }),
});
