import { useFetchCalls } from '../../hooks/useFetchCalls';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';

const CallsContainer = () => {
  const URL = 'https://api.skilla.ru/mango/getList';
  const TOKEN = 'testtoken';

  const { calls, isLoading, error } = useFetchCalls(URL, TOKEN);

  return (
    <div>{isLoading ? <Loading /> : error ? <div>{error}</div> : <CallsTable calls={calls} />}</div>
  );
};
export default CallsContainer;
