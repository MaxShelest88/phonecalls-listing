import { ICall } from "../../models/ICallList";
import TableRow from "./TableRow/TableRow";

interface CallTableProps {
  calls: ICall[];
}

const CallsTable: React.FC<CallTableProps> = ({ calls }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Тип</th>
          <th>Время</th>
          <th>Сотрудник</th>
          <th>Звонок</th>
          <th>Источник</th>
          <th>Длительность</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <TableRow
            call={call}
            key={call.id}
          />
        ))}
      </tbody>
    </table>
  );
};
export default CallsTable;
