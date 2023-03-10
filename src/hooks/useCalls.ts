import { ICall } from './../models/ICallList';
import { useMemo } from 'react';

export const useFilterCalls = (calls: ICall[] | undefined, startDate: Date, endDate: Date): ICall[] => {
	const filteredCalls = useMemo(() => {
    return calls!.filter((call) => {
      const callDate = new Date(call.date);
      return (
        callDate.setHours(0, 0, 0, 0) >= startDate.setHours(0, 0, 0, 0) &&
        callDate.setHours(0, 0, 0, 0) <= endDate.setHours(0, 0, 0, 0)
      );
    });
  }, [calls, endDate, startDate]);
 return filteredCalls;
};

export const useCalls = (
  calls: ICall[],
  startDate: Date,
  endDate: Date,
): { [key: string]: ICall[] } => {
  const filterdCalls = useFilterCalls(calls, startDate, endDate);
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
