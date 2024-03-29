import IconChevronDown from 'components/UI/Icons/IconChevronDown';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import classes from './Dropdown.module.scss';

interface DropdownProps<T> {
  items: T[];
  onClickItem: (name: string, value: number) => void;
  selectedItem: T;
  filtered: boolean;
}

const Dropdown = <T extends { value: number; name: string; img?: string; updates?: boolean }>({
  items,
  selectedItem,
  onClickItem,
  filtered,
}: DropdownProps<T>): JSX.Element => {
  const [dropdownVisible, setDropdownIsVisible] = useState<boolean>(false);
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

  const DropdownItem: React.FC<T> = (props): JSX.Element => {
    return (
      <li
        className={`${classes.item} ${props.name === selectedItem.name ? classes.active : ''}`}
        onClick={() => onClickItem(props.name, props.value)}
      >
        <div className={classes['item-content']}>
          {props.img && (
            <div className={classes.avatar}>
              <img
                src={props.img}
                alt="avatar"
              />
            </div>
          )}
          <span>{props.name}</span>
        </div>

        {props.updates && <div className={classes.updates} />}
      </li>
    );
  };
  return (
    <div className={`${classes.container} ${dropdownVisible || filtered ? classes.active : ''}`}>
      <div
        ref={dropdownRef}
        onClick={() => setDropdownIsVisible((prevVisible) => !prevVisible)}
      >
        {selectedItem.name}
      </div>
      <div className={`${classes.arrow} ${dropdownVisible ? classes.active : ''}`}>
        <IconChevronDown color={dropdownVisible ? '#005ff8' : '#ADBFDF'} />
      </div>
      {dropdownVisible && (
        <div className={classes.menu}>
          <ul>
            {items.map((item, index) => (
              <DropdownItem
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
export default React.memo(Dropdown) as typeof Dropdown;
