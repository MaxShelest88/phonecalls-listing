import { useAxios } from '../../hooks/useAxios';
import { ICall, ICallList } from '../../models/ICallList';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';

const CallsContainer = () => {
  const URL = 'https://api.skilla.ru/mango/getList';
  const TOKEN = 'testtoken';

  const { data: calls, isLoading, error } = useAxios({
    url: URL,
    method: 'post',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
  });

	

  return (
    <div>{isLoading ? <Loading /> : error ? <div>{error}</div> : <CallsTable calls={calls || []} />}</div>
  );
};
export default CallsContainer;
