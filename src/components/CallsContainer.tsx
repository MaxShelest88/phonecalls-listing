import { useEffect, useState } from 'react';
import { ICall } from '../models/ICallList';
import Loading from './Loading/Loading';

const CallsContainer = () => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const URL = 'https://api.skilla.ru/mango/getList';
  const TOKEN = 'testtoken';
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();
      setCalls(data.results);
      setIsLoading(false);
    } catch (e) {
      let message;
      if (e instanceof Error) {
        message = e.message;
        setError(message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  interface TableRowProps {
    call: ICall;
  }

  const TableRow: React.FC<TableRowProps> = ({ call }) => {
    return (
      <tr>
        <td>{call.in_out}</td>
        <td>{call.date}</td>
        <td>{call.person_avatar}</td>
        <td>{call.in_out ? call.from_number : call.to_number}</td>
        <td>{call.source}</td>
        <td>{call.time}</td>
      </tr>
    );
  };

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

  return (
    <div>{isLoading ? <Loading /> : error ? <div>{error}</div> : <CallsTable calls={calls} />}</div>
  );
};
export default CallsContainer;
