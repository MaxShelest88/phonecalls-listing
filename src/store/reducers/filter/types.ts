export interface IDate {
  startDate: string;
  endDate: string;
  name: string;
}

export interface FilterState {
  searchValue: string;
  typeValue: {
    type: -1 | 1 | 0;
    name: string;
  };
  dateValue: IDate;
}