import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setDaysBeforeCurrentDate } from '../../../utils/dateHelper';
import { FilterState, IDate } from './types';

const initialState: FilterState = {
  searchValue: '',
  typeValue: {
    value: -1,
    name: 'Все типы',
  },
  dateValue: {
    startDate: setDaysBeforeCurrentDate(2),
    endDate: new Date().toString(),
    name: '3 дня',
  },
  filtered: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.filtered = true;
    },
    setType: (state, action) => {
      state.typeValue = action.payload;
      state.filtered = true;
    },
    setDate: (state, action: PayloadAction<IDate>) => {
      state.dateValue.startDate = action.payload.startDate
        ? action.payload.startDate
        : state.dateValue.startDate;
      state.dateValue.endDate = action.payload.endDate
        ? action.payload.endDate
        : state.dateValue.endDate;
      state.dateValue.name = action.payload.name;
      state.filtered = true;
    },
    resetFilters: (state) => {
      state.searchValue = '';
      state.typeValue = { value: -1, name: 'Все типы' };
      state.dateValue = {
        startDate: setDaysBeforeCurrentDate(2),
        endDate: new Date().toString(),
        name: '3 дня',
      };
      state.filtered = false;
    },
  },
});

export const { setSearchValue, setType, setDate, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
