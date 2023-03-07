import { ICall } from './../models/ICallList';
import { useMemo } from 'react';

interface useCallsParams {
  calls: ICall[];
  startDate: Date;
  finishDate: Date;
}

export const useCalls = ({ calls, startDate, finishDate }: useCallsParams):ICall[] => {
  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      const callDate = new Date(call.date);
      return (
        callDate.setHours(0, 0, 0, 0) >= startDate.setHours(0, 0, 0, 0) &&
        callDate.setHours(0, 0, 0, 0) <= finishDate.setHours(0, 0, 0, 0)
      );
    });
  }, [calls, finishDate, startDate]);
  return filteredCalls;
};
