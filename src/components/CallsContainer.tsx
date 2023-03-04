import { callApi } from '../services/CallService';
import { useTable, Column } from 'react-table';
import { useMemo } from 'react';
import Loading from './Loading/Loading';
import { ICall } from '../models/ICallList';

interface TableProps {
  columns: Column<ICall>[];
  data: ICall[] | [];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      style={{ border: 'solid 1px blue' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const CallsContainer = () => {
  const { data: callList, error, isLoading } = callApi.useFetchAllCallsQuery('', {});
  const columns: Column<ICall>[] = useMemo(
    () => [
      {
        Header: 'Тип',
        accessor: 'in_out', // accessor is the "key" in the data
      },
      {
        Header: 'Время',
        accessor: 'date',
      },
      {
        Header: 'Сотрудник',
        accessor: 'person_avatar',
      },
      {
        Header: 'Звонок',
        accessor: 'from_number',
      },
      {
        Header: 'Источник',
        accessor: 'source',
      },
      {
        Header: 'Длительность',
        accessor: 'time',
      },
    ],
    [],
  );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={callList!.results}
          columns={columns}
        />
      )}
    </div>
  );
};
export default CallsContainer;
