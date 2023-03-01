import { callApi } from '../services/CallService';

const CallsContainer = () => {
  const { data: callList, error, isLoading } = callApi.useFetchAllCallsQuery('',{});

  return <div>{JSON.stringify(callList?.results)}</div>;
};
export default CallsContainer;
