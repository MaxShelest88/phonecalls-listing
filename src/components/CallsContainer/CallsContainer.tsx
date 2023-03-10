import { useCallback, useState, useEffect, useMemo } from 'react';
import { useAxios } from '../../hooks/useAxios';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ICallList } from '../../models/ICallList';
import DatepickerComponent from '../DatepickerComponent/DatepickerComponent';
import { IDatepickerComponentListItem } from '../../models/IDatepicker';
import { useCalls } from '../../hooks/useCalls';
import IconAdd from '../UI/Icons/IconAdd';
import DropDown from '../Dropdown/DropDown';

const CallsContainer = () => {
  const datePikerListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const typesListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 0, name: 'Исходящие' },
      { value: 1, name: 'Входищие' },
    ];
  }, []);
  const callsListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const sourcesListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const ratingListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const errorsListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);

  const [fetchCalls, calls, isLoading, error] = useAxios<ICallList>(
    {
      url: process.env.REACT_APP_URL,
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        Accept: 'application/json',
      },
    },
    { total_rows: '', results: [] },
  );

  useEffect(() => {
    fetchCalls();
  }, []);

  const setDaysBeforeCurrentDate = useCallback((days: number): Date => {
    const currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() - days));
  }, []);

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(setDaysBeforeCurrentDate(2));
  const [selectedValue, setSelectedValue] = useState<string>('3 дня');
  const [count, setCount] = useState<number>(0);
  const groupedCallsObj = useCalls(calls.results, startDate, endDate);

  const onItemClickHandler = useCallback(
    (value: number) => {
      setStartDate(setDaysBeforeCurrentDate(value));
    },
    [setDaysBeforeCurrentDate],
  );

  useEffect(() => {
    setSelectedValue(datePikerListItems[count].name);
    setStartDate(setDaysBeforeCurrentDate(datePikerListItems[count].value));
  }, [count, datePikerListItems, setDaysBeforeCurrentDate]);

  const onArrowClickHandler = useCallback(
    (type: string) => {
      const itemsNumber = datePikerListItems.length;
      switch (type) {
        case 'left': {
          if (count === 0) {
            setCount(itemsNumber);
          }
          setCount((prevCount) => prevCount - 1);

          break;
        }
        case 'right': {
          setCount((prevCount) => prevCount + 1);
          if (count >= itemsNumber - 1) {
            setCount(0);
          }
          break;
        }
      }
    },
    [count, datePikerListItems],
  );

  return (
    <>
      <div className={classes['filters-container']}>
        <div className={classes['datepicker-container']}>
          <div className={classes.balance}>
            <span className={classes['balance-text']}>Баланс:</span>
            <span className={classes['balance-number']}>272 ₽</span>
            <IconAdd
              color="#005FF8"
              size="24px"
            />
          </div>
          {!isLoading && !error && (
            <DatepickerComponent
              items={datePikerListItems}
              endDate={endDate}
              startDate={startDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              onClick={onItemClickHandler}
              calls={calls.results}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
              onArrowClickHandler={onArrowClickHandler}
            />
          )}
        </div>
        <div className={classes['filers-block']}>
          <div className={classes.search}></div>
          <div className={classes.filters}>
            <DropDown
              items={typesListItems}
              initalValue={'Все типы'}
            />
          </div>
        </div>
      </div>
      <div className={classes['table-container']}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <CallsTable groupedCallsObj={groupedCallsObj} />
        )}
      </div>
    </>
  );
};
export default CallsContainer;
