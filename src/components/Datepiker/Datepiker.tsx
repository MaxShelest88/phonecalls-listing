import classes from './Datepiker.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { useEffect, useRef, useState } from 'react';
import { IDatepikerListItemProps, IDatepikerProps } from '../../models/IDatepiker';
registerLocale('ru', ru);

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

const Datepiker: React.FC<IDatepikerProps> = ({
  items,
  startDate,
  finishDate,
  setStartDate,
  setFinishDate,
  onClick,
}): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState('3 дня');
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
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

  const onClickHandler = (name: string, value: number) => {
    setSelectedValue(name);
    onClick(value);
    setDropdownIsVisible(false);
  };

  const onStartDateChangeHandler = (date: Date) => {
    setStartDate(date);
    setSelectedValue(`${startDate.getDate()} - ${finishDate.getDate()}`);
  };
  const onFinishDateChangeHandler = (date: Date) => {
    setFinishDate(date);
    setSelectedValue(`${startDate.getDate()} - ${finishDate.getDate()}`);
    setDropdownIsVisible(false);
  };

  // TODO: Добавить onClick на Datepicker и передать туда значения setSelectedValue setDropdownIsVisible

  return (
    <div className={classes.container}>
      <div
        ref={dropdownRef}
        onClick={() => setDropdownIsVisible((prevState) => !prevState)}
      >
        {selectedValue}
      </div>
      {dropdownIsVisible && (
        <div className={classes.dropdown}>
          <ul>
            {items.map((item, index) => (
              <DropdownItem
                onClickHandler={onClickHandler}
                name={item.name}
                value={item.value}
                key={index}
              />
            ))}
            <li>
              <DatePicker
                locale="ru"
                selected={startDate}
                onChange={(date) => date && onStartDateChangeHandler(date)}
              />
              <DatePicker
                locale="ru"
                selected={finishDate}
                onChange={(date) => date && onFinishDateChangeHandler(date)}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Datepiker;
