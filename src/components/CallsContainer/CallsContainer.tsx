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

const CallsContainer = () => {
  const datePikerListItems: IDatepickerComponentListItem[] = useMemo(() => {
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
      const itemsNumber = datePikerListItems.length - 1;
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
          if (count >= itemsNumber) {
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
