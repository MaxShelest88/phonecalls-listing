import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setDaysBeforeCurrentDate } from '../../../utils/dateHelper';
import { FilterState, IDate, IType } from './types';

const initialState: FilterState = {
  typeValue: {
    value: -1,
    name: 'Все типы',
    isFilter: false,
  },
  dateValue: {
    startDate: setDaysBeforeCurrentDate(2),
    endDate: new Date().toString(),
    name: '3 дня',
    isFilter: false,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setType: (state, action:PayloadAction<IType>) => {
      state.typeValue = action.payload;
      state.typeValue.isFilter = state.typeValue.value === -1 ? false : true;
    },
    setDate: (state, action: PayloadAction<IDate>) => {
      state.dateValue.startDate = action.payload.startDate
        ? action.payload.startDate
        : state.dateValue.startDate;
      state.dateValue.endDate = action.payload.endDate
        ? action.payload.endDate
        : state.dateValue.endDate;
      state.dateValue.name = action.payload.name;
      state.dateValue.isFilter = state.dateValue.name === '3 дня' ? false : true;
    },
    
    resetFilters: (state) => {
      state.typeValue = { value: -1, name: 'Все типы', isFilter: false };
      state.dateValue = {
        startDate: setDaysBeforeCurrentDate(2),
        endDate: new Date().toString(),
        name: '3 дня',
        isFilter: false,
      };
    },
  },
});

export const { setType, setDate, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
