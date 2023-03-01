import { callApi } from './../services/CallService';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { [callApi.reducerPath]: callApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(callApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
