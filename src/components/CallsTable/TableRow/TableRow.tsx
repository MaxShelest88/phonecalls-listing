import { ICall } from "../../../models/ICallList";

interface TableRowProps {
  call: ICall;
}

const TableRow: React.FC<TableRowProps> = ({ call }) => {
  return (
    <tr>
      <td>{call.in_out}</td>
      <td>{call.date}</td>
      <td>{call.person_avatar}</td>
      <td>{call.from_number}</td>
      <td>{call.source}</td>
      <td>{call.time}</td>
    </tr>
  );
};
export default TableRow;
