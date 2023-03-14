import { IListItem } from './../models/IListItem';
import { ICall, ICallList } from '../models/ICallList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const callApi = createApi({
  reducerPath: 'callApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.skilla.ru/mango/' }),
  tagTypes: ['Call'],
  endpoints: (build) => ({
    fetchAllCalls: build.query<ICall[], string>({
      query: (token) => ({
        url: 'getList',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: ICallList, meta, arg) => response.results,
    }),
    //  fetchAudio: build.query({
    //    query: (recordId, partnerId) => ({
    //      url: 'getList',
    //      method: 'POST',
    //      headers: { Authorization: 'Bearer testtoken' },
    //    }),
    //  }),
  }),
});
