import { useCallback, useState, useMemo } from 'react';
import { useAxios } from '../../hooks/useAxios';
import CallsTable from '../CallsTable/CallsTable';

import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ICall } from '../../models/ICallList';
import Datepiker from '../Datepiker/Datepiker';

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

  const [calls, isLoading, error] = useAxios<ICall[]>(
    {
      url: URL,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    [],
  );

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
       callDate.getTime() >= startDate!.getTime() && callDate.getTime() <= finishDate!.getTime()
     );
   });
 }, [calls, finishDate, startDate]);


  return (
    <>
      <div className={classes['filters-container']}>
        <div className={classes['datepiker-container']}>
          <Datepiker
            items={[]}
            finishDate={finishDate}
            startDate={startDate}
            setFinishDate={setFinishDate}
            setStartDate={setStartDate}
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

