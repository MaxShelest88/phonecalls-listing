import classes from './DropDown.module.scss';

interface MyListItemProps<T> {
  text: string;
  data?: T;
}

interface DropDownProps<T> {
  items: MyListItemProps<T>[];
}

const DropDown = <T extends unknown>({ items }: DropDownProps<T>): JSX.Element => {
  return (
    <div
      className={classes.container}
    >
      <ul>
        {items.map((item: MyListItemProps<T>, index) => (
          <li
            className={classes.item}
            key={index}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DropDown;
