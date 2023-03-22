
import React from 'react';
import CallsTable from 'components/CallsTable/CallsTable';
import Filters from 'components/Filters/Filters';
import Loading from 'components/Loading/Loading';
import { useAppSelector } from 'hooks/redux';
import { useCalls } from 'hooks/useCalls';
import { callApi } from 'services/CallService';

const CallsContainer: React.FC = (): JSX.Element => {
  const { data: calls, isLoading, error } = callApi.useFetchAllCallsQuery();
  const dateValue = useAppSelector((store) => store.filterReducer.dateValue);
  const typeFilter = useAppSelector((store) => store.filterReducer.typeValue);
  const groupedCalls = useCalls(
    calls || [],
    dateValue.startDate || '',
    dateValue.endDate || '',
    typeFilter.value,
  );

  return (
    <>
      <Filters calls={calls || []} />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>ошибка запроса</div>
      ) : (
        <CallsTable groupedCalls={groupedCalls} />
      )}
    </>
  );
};
export default CallsContainer;
