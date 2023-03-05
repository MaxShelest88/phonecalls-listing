import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ICall, ICallList } from '../models/ICallList';
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
      const { data } = await axios.post<ICallList>(
        URL,
        {},
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        },
      );
      setCalls(data.results);
      setIsLoading(false);
    } catch (e) {
      let message: string;
      if (axios.isAxiosError(e) && e.response) {
        message = e.message;
        setError(message);
      } else {
        message = String(error);
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
        <td>{call.from_number}</td>
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
