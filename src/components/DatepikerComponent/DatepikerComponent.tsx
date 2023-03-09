import classes from './DatepikerComponent.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { subDays, addDays, differenceInDays } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IDatepikerProps } from '../../models/IDatepiker';
import { formatDate } from '../../utils/formatters';
registerLocale('ru', ru);

// TODO: стилизация инпутов, стрелки

const DatepikerComponent: React.FC<IDatepikerProps> = ({
  items,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onClick,
  calls,
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

  const callsDays = useMemo(() => {
    return differenceInDays(
      new Date(calls[0]?.date_notime),
      new Date(calls[calls.length - 1]?.date_notime),
    );
  }, [calls]);

  const onItemClickHandler = (name: string, value: number) => {
    setSelectedValue(name);
    onClick(value);
    setDropdownIsVisible(false);
  };

  const onStartDateChangeHandler = (date: Date) => {
    setStartDate(date);
    setSelectedValue(`${formatDate(date)} - ${formatDate(endDate)}`);
  };

  const onEndDateChangeHandler = (date: Date) => {
    setEndDate(date);
    setSelectedValue(`${formatDate(startDate)} - ${formatDate(date)}`);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes['top-value']}
        ref={dropdownRef}
        onClick={() => setDropdownIsVisible((prevState) => !prevState)}
      >
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
            fill="#ADBFDF"
          />
        </svg>
        <span>{selectedValue}</span>
      </div>
      {dropdownIsVisible && (
        <div className={classes.dropdown}>
          <ul>
            {items.map((item) => (
              <li
                onClick={() => onItemClickHandler(item.name, item.value)}
                className={`${classes.item} ${item.name === selectedValue ? classes.active : ''}`}
                key={item.value}
              >
                <span>{item.name}</span>
              </li>
            ))}
            <li
              className={classes['date-items']}
              onClick={(e) => e.stopPropagation()}
            >
              <DatePicker
                locale="ru"
                selected={startDate}
                onChange={(date) => date && onStartDateChangeHandler(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                includeDateIntervals={[
                  {
                    start: subDays(new Date(), callsDays),
                    end: addDays(new Date(), 0),
                  },
                ]}
              />
              <DatePicker
                locale="ru"
                selected={endDate}
                onChange={(date) => date && onEndDateChangeHandler(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                includeDateIntervals={[
                  {
                    start: subDays(new Date(), callsDays),
                    end: addDays(new Date(), 0),
                  },
                ]}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default DatepikerComponent;
