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
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { IDate } from '../../store/reducers/filter/types';
import { setDaysBeforeCurrentDate } from '../../utils/dateHelper';
import { setDate } from '../../store/reducers/filter/filterSlice';
import InputMask from 'react-input-mask';
registerLocale('ru', ru);

const DatepickerComponent: React.FC<IDatepickerComponentProps> = ({
  items,
  startDate,
  endDate,
  calls,
  selectedValue,
  onArrowClickHandler,
}): JSX.Element => {
  const [dropdownIsVisible, setDropdownIsVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [startDateLocal, setStartDateLocal] = useState<Date | null>(null);
  const [endDateLocal, setEndDateLocal] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

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
    const dateValue = {
      startDate: setDaysBeforeCurrentDate(value),
      endDate: new Date().toString(),
      name,
    } as IDate;
    dispatch(setDate(dateValue));
    setStartDateLocal(null);
    setEndDateLocal(null);
  };

  const onStartDateChangeHandler = (date: Date) => {
    const dateValue = {
      startDate: date.toString(),
      name: `${formatDate(date)} - ${formatDate(endDate)}`,
    } as IDate;
    dispatch(setDate(dateValue));
    setStartDateLocal(date);
  };

  const onEndDateChangeHandler = (date: Date) => {
    const dateValue = {
      endDate: date.toString(),
      name: `${formatDate(startDate)} - ${formatDate(date)}`,
    } as IDate;
    dispatch(setDate(dateValue));
    setEndDateLocal(date);
  };

  return (
    <div className={classes.container}>
      <div className={classes['date-container']}>
        <div
          onClick={() => onArrowClickHandler('left')}
          className={classes['arrow']}
        >
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
        <div
          onClick={() => onArrowClickHandler('right')}
          className={`${classes.arrow} ${classes.right}`}
        >
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
                        start: subDays(new Date(), callsDays + 1),
                        end: addDays(new Date(), 0),
                      },
                    ]}
                    customInput={
                      <InputMask
                        mask="99.99.99"
                        maskPlaceholder={'__.__.__'}
                      >
                        <CustomInput />
                      </InputMask>
                    }
                    placeholderText="__.__.__"
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
                        start: subDays(new Date(), callsDays + 1),
                        end: addDays(new Date(), 0),
                      },
                    ]}
                    customInput={
                      <InputMask
                        mask="99.99.99"
                        maskPlaceholder={'__.__.__'}
                      >
                        <CustomInput />
                      </InputMask>
                    }
                    placeholderText="__.__.__"
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
