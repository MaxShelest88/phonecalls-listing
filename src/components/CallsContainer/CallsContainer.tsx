import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import CallsTable from '../CallsTable/CallsTable';
import DatePicker from 'react-datepicker';
import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ICall } from '../../models/ICallList';

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
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className={classes['filters-container']}>
        <div className={classes['datepiker-container']}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div className={classes['table-container']}>
        {isLoading ? <Loading /> : error ? <div>{error}</div> : <CallsTable calls={calls || []} />}
      </div>
    </>
  );
};
export default CallsContainer;
