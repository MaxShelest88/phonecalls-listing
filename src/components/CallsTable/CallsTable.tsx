import { ICall } from "../../models/ICallList";
import TableRow from "./TableRow/TableRow";
import classes from './CallsTable.module.scss';

interface CallTableProps {
  calls: ICall[] | [];
}

const CallsTable: React.FC<CallTableProps> = ({ calls }) => {
  return (
    <table className={classes.table}>
      <thead className={classes['table-head']}>
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
