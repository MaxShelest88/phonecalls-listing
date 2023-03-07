import classes from './Datepiker.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { useEffect, useRef, useState } from 'react';
registerLocale('ru', ru);

interface ListItemProps {
  text: string;
  img?: string;
}

interface DatepikerProps {
  items: ListItemProps[];
  startDate: Date;
  finishDate: Date;
  setStartDate: (date: Date) => void;
  setFinishDate: (date: Date) => void;
}

const Datepiker: React.FC<DatepikerProps> = ({
  items,
  startDate,
  finishDate,
  setStartDate,
  setFinishDate,
}): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState('Дата пикер');
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

  const onClickHandler = (value: string) => {
    setSelectedValue(value);
    setDropdownIsVisible(false);
  };

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
    <div
      ref={dropdownRef}
      className={classes.container}
    >
      <div onClick={() => setDropdownIsVisible((prevState) => !prevState)}>{selectedValue}</div>
      {dropdownIsVisible && (
        <div className={classes.dropdown}>
          <ul>
            {items.map((item: ListItemProps, index) => (
              <DropDownItem
                text={item.text}
                key={index}
              />
            ))}
            <li>
              <DatePicker
                locale="ru"
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
              />
              <DatePicker
                locale="ru"
                selected={finishDate}
                onChange={(date) => date && setFinishDate(date)}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Datepiker;
