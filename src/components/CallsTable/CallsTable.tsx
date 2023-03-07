import { ICall } from '../../models/ICallList';
import classes from './CallsTable.module.scss';
import React from 'react';
import TableGroup from './TableGroup/TableGroup';

interface CallTableProps {
  calls: ICall[];
}

const CallsTable: React.FC<CallTableProps> = ({ calls }) => {
  const groupCallsByDate = calls.reduce(
    (callObj: { [key: string]: ICall[] }, item: ICall, index: number, array: ICall[]) => {
      callObj[item.date_notime] = array.filter(
        (call: ICall) => call.date_notime === item.date_notime,
      );
      return callObj;
    },
    {} as { [key: string]: ICall[] },
  );

  const callsGroupArr = Object.entries(groupCallsByDate).map((item) => ({
    date: item[0],
    calls: item[1] as ICall[],
  }));

  return (
    <table className={classes.table}>
      <thead className={classes['table-head']}>
        <tr>
          <th>Тип</th>
          <th>Время</th>
          <th>Сотрудник</th>
          <th>Звонок</th>
          <th>Источник</th>
          <th>Оценка</th>
          <th>Длительность</th>
        </tr>
      </thead>

      {callsGroupArr.map((groupItem) => (
        <TableGroup
          {...groupItem}
          key={groupItem.date}
        />
      ))}
    </table>
  );
};
export default CallsTable;
