import React from "react";
import { ICall } from "../../../models/ICallList";
import TableRow from "../TableRow/TableRow";


interface TableGroupProps {
	date: string, 
	calls: ICall[]
}

const TableGroup: React.FC<TableGroupProps> = (arr) => {

	const currentDay = new Date().getDay()
	const itemDay = new Date(arr.date).getDay();
	
  return (
    <React.Fragment>
      <tr>{currentDay !== itemDay && <td>{arr.date}</td>}</tr>
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
