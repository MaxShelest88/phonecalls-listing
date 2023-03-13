import { ICall } from './../models/ICallList';
import { useMemo } from 'react';

export const useFilterCalls = (
  calls: ICall[],
  startDate: string,
  endDate: string,
  type: -1 | 1 | 0,
): ICall[] => {
  const filteredCalls = useMemo(() => {
    return calls
      .filter((call) => {
        const callDate = new Date(call.date);
        return (
          callDate.setHours(0, 0, 0, 0) >= new Date(startDate).setHours(0, 0, 0, 0) &&
          callDate.setHours(0, 0, 0, 0) <= new Date(endDate).setHours(0, 0, 0, 0)
        );
      })
      .filter((call) => (type === -1 ? call : call.in_out === type));
  }, [calls, endDate, startDate, type]);
  return filteredCalls;
};

export const useCalls = (
  calls: ICall[],
  startDate: string,
  endDate: string,
  type: -1 | 1 | 0,
): { [key: string]: ICall[] } => {
  const filterdCalls = useFilterCalls(calls, startDate, endDate, type);
  const groupedCalls = useMemo(() => {
    return filterdCalls.reduce(
      (callObj: { [key: string]: ICall[] }, item: ICall, index: number, array: ICall[]) => {
        callObj[item.date_notime] = array.filter(
          (call: ICall) => call.date_notime === item.date_notime,
        );
        return callObj;
      },
      {} as { [key: string]: ICall[] },
    );
  }, [filterdCalls]);
  return groupedCalls;
};
