import classes from './DropDown.module.scss';

interface ListItemProps {
  text: string;
  img?: string;
}

interface DropDownProps {
  items: ListItemProps[];
}

const DropDown: React.FC<DropDownProps> = ({ items }): JSX.Element => {
  const DropDownItem: React.FC<ListItemProps> = (props): JSX.Element => {
    return (
      <li className={classes.item}>
        <div>
          <img
            src={props.img}
            alt="item"
          />
        </div>
        <span>{props.text}</span>
      </li>
    );
  };
  return (
    <div className={classes.container}>
      <ul>
        {items.map((item: ListItemProps, index) => (
          <DropDownItem
            text={item.text}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};
export default DropDown;
