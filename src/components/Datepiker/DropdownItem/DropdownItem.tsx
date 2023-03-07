import { IDatepikerListItemProps } from '../../../models/IDatepiker';
import classes from './Datepiker.module.scss';

const DropdownItem: React.FC<IDatepikerListItemProps> = ({
  name,
  value,
  onClickHandler,
}): JSX.Element => {
  return (
    <li
      onClick={() => onClickHandler(name, value)}
      className={classes.item}
    >
      <span>{name}</span>
    </li>
  );
};

export default DropdownItem;
