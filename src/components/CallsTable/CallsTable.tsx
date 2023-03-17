import { ICall } from '../../models/ICallList';
import classes from './CallsTable.module.scss';
import React, { useMemo } from 'react';
import TableGroup from './TableGroup/TableGroup';

interface CallTableProps {
  groupedCalls: { date: string; calls: ICall[] }[];
}

const CallsTable: React.FC<CallTableProps> = ({ groupedCalls }): JSX.Element => {
  //   const callsGroupArr = useMemo(() => {
  //     return Object.entries(groupedCallsObj).map((item) => ({
  //       date: item[0],
  //       calls: item[1] as ICall[],
  //     }));
  //   }, [groupedCallsObj]);

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

      {groupedCalls.map((groupItem) => (
        <TableGroup
          {...groupItem}
          key={groupItem.date}
        />
      ))}
    </table>
  );
};
export default React.memo(CallsTable);
