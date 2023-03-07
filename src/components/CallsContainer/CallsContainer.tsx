import { useCallback, useState, useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ICallList } from '../../models/ICallList';
import Datepiker from '../Datepiker/Datepiker';
import { IDatepikerListItem } from '../../models/IDatepiker';
import { useCalls } from '../../hooks/useCalls';

const datePikerListItems: IDatepikerListItem[] = [
  { value: 2, name: '3 дня' },
  { value: 6, name: 'неделя' },
  { value: 30, name: 'месяц' },
  { value: 364, name: 'год' },
];

const CallsContainer = () => {
  //   const URL = './mock_calls.json';

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

  //   const [fetchCalls, calls, isLoading, error] = useAxios<ICall[]>(
  //     {
  //       url: URL,
  //       method: 'get',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //     [],
  //   );

  useEffect(() => {
    fetchCalls();
  }, []);

  const setDaysBeforeCurrentDate = useCallback((days: number): Date => {
    const currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() - days));
  }, []);

  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(setDaysBeforeCurrentDate(2));

  const filteredCalls = useCalls({ calls: calls.results, startDate, finishDate });

  const onItemClickHandler = (value: number) => {
    setStartDate(setDaysBeforeCurrentDate(value));
  };

  return (
    <>
      <div className={classes['filters-container']}>
        <div className={classes['datepiker-container']}>
          <Datepiker
            items={datePikerListItems}
            finishDate={finishDate}
            startDate={startDate}
            setFinishDate={setFinishDate}
            setStartDate={setStartDate}
            onClick={onItemClickHandler}
          />
        </div>
      </div>
      <div className={classes['table-container']}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <CallsTable calls={filteredCalls} />
        )}
      </div>
    </>
  );
};
export default CallsContainer;
