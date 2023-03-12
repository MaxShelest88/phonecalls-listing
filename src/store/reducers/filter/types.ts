export interface IDate {
  startDate: string;
  endDate: string;
  name: string;
}

export interface IType {
  type: -1 | 1 | 0;
  name: string;
}

export interface FilterState {
  searchValue: string;
	typeValue: IType;
  dateValue: IDate;
}