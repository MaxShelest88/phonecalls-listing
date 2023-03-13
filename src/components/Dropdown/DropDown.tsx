import { useEffect, useRef, useState } from 'react';
import classes from './DropDown.module.scss';

interface DropDownProps<T> {
  items: T[];
  onClickItem: (name: string, value: number) => void;
  initalValue: string;
}

const Dropdown = <T extends { value: number; name: string; img?: string }>({
  items,
  initalValue,
  onClickItem,
}: DropDownProps<T>): JSX.Element => {
  const [dropdownVisible, setDropdownIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !e.composedPath().includes(dropdownRef.current)) {
        setDropdownIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const DropDownItem: React.FC<T> = (props): JSX.Element => {
    return (
      <li
        className={classes.item}
        onClick={() => onClickItem(props.name, props.value)}
      >
        {props.img && (
          <div>
            <img
              src={props.img}
              alt="item"
            />
          </div>
        )}
        <span>{props.name}</span>
      </li>
    );
  };
  return (
    <div className={classes.container}>
      <div
        ref={dropdownRef}
        onClick={() => setDropdownIsVisible((prevVisible) => !prevVisible)}
      >
        {initalValue}
      </div>
      {dropdownVisible && (
        <div className={classes.menu}>
          <ul>
            {items.map((item, index) => (
              <DropDownItem
                {...item}
                key={index}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
