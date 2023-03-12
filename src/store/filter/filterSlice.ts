import { createSlice } from '@reduxjs/toolkit';
import { setDaysBeforeCurrentDate } from '../../utils/dateHelper';

interface FilterState {
  searchValue: string;
  typeValue: {
    type: -1 | 1 | 0;
    name: string;
  };
  dateValue: {
    startDate: string;
    endDate: string;
    name: string;
  };
}

const initialState: FilterState = {
  searchValue: '',
  typeValue: {
    type: -1,
    name: 'Все типы',
  },
  dateValue: {
    startDate: setDaysBeforeCurrentDate(2),
    endDate: new Date().toISOString(),
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
    setDate: (state, action) => {
      state.dateValue = action.payload;
    },
    resetFilters: (state) => {
      state.searchValue = '';
      state.typeValue = { type: -1, name: 'Все типы' };
      state.dateValue = {
        startDate: setDaysBeforeCurrentDate(2),
        endDate: new Date().toISOString(),
        name: '3 дня',
      };
    },
  },
});

export const { setSearchValue, setType, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
