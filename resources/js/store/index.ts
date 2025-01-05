import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import StateSlice from './slice/stateSlice/index';

export const store = configureStore({
  reducer: {
    state: StateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
