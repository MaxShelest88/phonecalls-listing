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
  finishDate: Date;
  setStartDate: (date: Date) => void;
  setFinishDate: (date: Date) => void;
  onClick: (value: number) => void;
}
