import { ICall } from './ICallList';

export interface IDatepickerComponentListItem {
  value: number;
  name: string;
}

export interface IDatepickerComponentListItemProps {
  value: number;
  name: string;
  onClickHandler: (name: string, value: number) => void;
}

export interface IDatepickerComponentProps {
  items: IDatepickerComponentListItem[];
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  onClick: (value: number) => void;
  calls: ICall[];
  selectedValue: string;
  setSelectedValue: (name: string) => void;
  onArrowClickHandler: (type: string) => void;
}
