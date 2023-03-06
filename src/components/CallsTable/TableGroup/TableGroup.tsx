import React from "react";
import { ICall } from "../../../models/ICallList";
import { formatDate } from "../../../utils/formatters";
import TableRow from "../TableRow/TableRow";


interface TableGroupProps {
	date: string, 
	calls: ICall[]
}

const TableGroup: React.FC<TableGroupProps> = (arr) => {

	const currentDay = new Date().getDay()
	const itemDay = new Date(arr.date).getDay();

	console.log(formatDate(arr.date));
	
  return (
    <React.Fragment>
      <tr>{currentDay !== itemDay && <td>{formatDate(arr.date)}</td>}</tr>
      {arr.calls.map((call) => (
        <TableRow
          call={call}
          key={call.id}
        />
      ))}
    </React.Fragment>
  );
};
export default TableGroup;
