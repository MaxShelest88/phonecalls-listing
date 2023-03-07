import React from "react";
import { ICall } from "../../../models/ICallList";
import { formatDate } from "../../../utils/formatters";
import TableRow from "../TableRow/TableRow";
import classes from './TableGroup.module.scss';

interface TableGroupProps {
	date: string, 
	calls: ICall[]
}

const TableGroup: React.FC<TableGroupProps> = (arr) => {

	const currentDay = new Date().getDay()
	const itemDay = new Date(arr.date).getDay();
	
  return (
    <tbody className={classes['body']}>
      <tr className={classes['date-row']}>
        {currentDay !== itemDay && (
          <td colSpan={100}>
            <div>
              <span className={classes.date}>
                {formatDate(arr.date)}
                <span className={classes.quantity}>{arr.calls.length}</span>
              </span>
            </div>
          </td>
        )}
      </tr>
      {arr.calls.map((call) => (
        <TableRow
          call={call}
          key={call.id}
        />
      ))}
    </tbody>
  );
};
export default TableGroup;
