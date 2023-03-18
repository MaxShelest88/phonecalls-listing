export interface IDate {
  startDate: string;
  endDate: string;
  name: string;
  isFilter: boolean;
}

export interface IType {
  value: -1 | 1 | 0;
  name: string;
  isFilter: boolean;
}

export interface FilterState {
  typeValue: IType;
  dateValue: IDate;
}
