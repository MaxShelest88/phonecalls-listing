import classes from './DatepickerComponent.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { subDays, addDays, differenceInDays } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IDatepickerComponentProps } from '../../models/IDatepicker';
import { formatDate } from '../../utils/formatters';
import CustomInput from './CustomInput/CustomInput';
import IconCalendar from '../UI/Icons/IconCalendar';
import IconArrowLeft from '../UI/Icons/IconArrowLeft';
registerLocale('ru', ru);

// TODO: стрелки

const DatepickerComponent: React.FC<IDatepickerComponentProps> = ({
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
  const [startDateLocal, setStartDateLocal] = useState<Date | null>(null);
  const [endDateLocal, setendDateLocal] = useState<Date | null>(null);

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
    setStartDateLocal(date);
    setSelectedValue(`${formatDate(date)} - ${formatDate(endDate)}`);
  };

  const onEndDateChangeHandler = (date: Date) => {
    setEndDate(date);
    setendDateLocal(date);
    setSelectedValue(`${formatDate(startDate)} - ${formatDate(date)}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes['date-container']}>
        <div className={classes['arrow']}>
          <IconArrowLeft color={'#ADBFDF'} />
        </div>
        <div
          className={classes['top-value']}
          ref={dropdownRef}
          onClick={() => setDropdownIsVisible((prevState) => !prevState)}
        >
          <IconCalendar color="#ADBFDF" />
          <span>{selectedValue}</span>
        </div>
        <div className={`${classes.arrow} ${classes.right}`}>
          <IconArrowLeft color={'#ADBFDF'} />
        </div>
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
              <p className={classes.title}>Указать даты</p>
              <div className={classes['date-block']}>
                <div className={classes['date-inputs']}>
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yy"
                    selected={startDateLocal}
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
                    customInput={<CustomInput />}
                    placeholderText="_ _._ _._ _"
                  />
                  <div className={classes.line} />
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yy"
                    selected={endDateLocal}
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
                    customInput={<CustomInput />}
                    placeholderText="_ _._ _._ _"
                  />
                </div>
                <IconCalendar color="#ADBFDF" />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default DatepickerComponent;
