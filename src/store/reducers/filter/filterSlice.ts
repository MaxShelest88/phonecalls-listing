import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setDaysBeforeCurrentDate } from '../../../utils/dateHelper';
import { FilterState, IDate } from './types';

const initialState: FilterState = {
  searchValue: '',
  typeValue: {
    type: -1,
    name: 'Все типы',
  },
  dateValue: {
    startDate: setDaysBeforeCurrentDate(2),
    endDate: new Date().toString(),
    name: '3 дня',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setType: (state, action) => {
      state.typeValue = action.payload;
    },
    setDate: (state, action: PayloadAction<IDate>) => {
      state.dateValue.startDate = action.payload.startDate
        ? action.payload.startDate
        : state.dateValue.startDate;
      state.dateValue.endDate = action.payload.endDate
        ? action.payload.endDate
        : state.dateValue.endDate;
      state.dateValue.name = action.payload.name;
    },
    resetFilters: (state) => {
      state.searchValue = '';
      state.typeValue = { type: -1, name: 'Все типы' };
      state.dateValue = {
        startDate: setDaysBeforeCurrentDate(2),
        endDate: new Date().toString(),
        name: '3 дня',
      };
    },
  },
});

export const { setSearchValue, setType, setDate, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
