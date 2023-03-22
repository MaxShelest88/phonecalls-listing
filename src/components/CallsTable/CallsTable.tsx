import { ICall } from '../../models/ICallList';
import classes from './CallsTable.module.scss';
import React from 'react';
import TableGroup from './TableGroup/TableGroup';

interface CallTableProps {
  groupedCalls: { date: string; calls: ICall[] }[];
}

const CallsTable: React.FC<CallTableProps> = ({ groupedCalls }): JSX.Element => {
  return (
    <div className={classes['table-container']}>
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
    </div>
  );
};
export default React.memo(CallsTable);
