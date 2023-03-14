import { ICall, ICallList } from '../models/ICallList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_URL;
const token = process.env.REACT_APP_TOKEN;

export const callApi = createApi({
  reducerPath: 'callApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Call'],
  endpoints: (build) => ({
    fetchAllCalls: build.query<ICall[], any>({
      query: () => ({
        url: 'getList',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: ICallList, meta, arg) => response.results,
    }),
    fetchAudio: build.query({
      query: (args) => {
        const { record, partnership_id } = args;
        return {
          url: 'getRecord',
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          params: { record, partnership_id },
        };
      },
      transformResponse: (response, meta, arg) => response.blob(),
    }),
  }),
});
