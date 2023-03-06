import { useAxios } from '../../hooks/useAxios';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';

const CallsContainer = () => {
  //   const URL = 'https://api.skilla.ru/mango/getList';
  const URL = './mock_calls.json';
  //   const TOKEN = 'testtoken';

  //   const { data: calls, isLoading, error } = useAxios({
  //     url: URL,
  //     method: 'post',
  //     headers: {
  //       Authorization: `Bearer ${TOKEN}`,
  //       Accept: 'application/json',
  //     },
  //   });

  const {
    data: calls,
    isLoading,
    error,
  } = useAxios({
    url: URL,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (
    <div className={classes['table-container']}>
      {isLoading ? <Loading /> : error ? <div>{error}</div> : <CallsTable calls={calls || []} />}
    </div>
  );
};
export default CallsContainer;
