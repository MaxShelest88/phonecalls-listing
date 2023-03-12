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
  calls: ICall[];
  selectedValue: string;
  onArrowClickHandler: (type: string) => void;
}
