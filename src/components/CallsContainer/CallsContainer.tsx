import { useCallback, useState, useMemo, useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
import CallsTable from '../CallsTable/CallsTable';

import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ICall } from '../../models/ICallList';
import Datepiker from '../Datepiker/Datepiker';
import { IDatepikerListItem } from '../../models/IDatepiker';

const datePikerListItems: IDatepikerListItem[] = [
  { value: 3, name: '3 дня' },
  { value: 7, name: 'неделя' },
  { value: 30, name: 'месяц' },
  { value: 365, name: 'год' },
];

const CallsContainer = () => {
  const URL = './mock_calls.json';

  //   const [ calls, isLoading, error ] = useAxios<ICall[]>({
  //     url: URL,
  //     method: 'post',
  //     headers: {
  //       Authorization: `Bearer ${env.TOKEN}`,
  //       Accept: 'application/json',
  //     },
  //   });

  const [fetchCalls, calls, isLoading, error] = useAxios<ICall[]>(
    {
      url: URL,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    [],
  );

  useEffect(() => {
    fetchCalls();
  }, []);

  const setDaysBeforeCurrentDate = useCallback((days: number): Date => {
    const date = new Date();
    return new Date(date.setDate(date.getDate() - days));
  }, []);

  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(setDaysBeforeCurrentDate(3));

  const filteredCalls = useMemo(() => {
    return calls?.filter((call) => {
      const callDate = new Date(call.date_notime);
      return (
        callDate.getDate() >= startDate!.getDate() && callDate.getDate() <= finishDate!.getDate()
      );
    });
  }, [calls, finishDate, startDate]);

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
