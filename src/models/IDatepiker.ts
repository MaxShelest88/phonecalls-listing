export interface IDatepikerListItem {
  value: number;
  name: string;
}

export interface IDatepikerListItemProps {
  value: number;
  name: string;
  onClickHandler: (name: string, value: number) => void;
}

export interface IDatepikerProps {
  items: IDatepikerListItem[];
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  onClick: (value: number) => void;
}
