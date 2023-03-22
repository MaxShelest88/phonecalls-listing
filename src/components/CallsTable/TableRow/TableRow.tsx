import React, { Suspense } from 'react';
import { useState } from 'react';
import { ICall } from '../../../models/ICallList';
import { formatTime } from '../../../utils/formatters';
import Loading from '../../Loading/Loading';
import classes from './TableRow.module.scss';
const Player = React.lazy(() => import(/* webpackChunkName: "Player" */ '../../Player/Player'));

interface TableRowProps {
  call: ICall;
}

const TableRow: React.FC<TableRowProps> = ({ call }): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  const showPlayer = () => {
    setActive(true);
  };

  const hidePlayer = () => {
    setActive(false);
  };

  return (
    <tr
      className={classes.row}
      onMouseEnter={showPlayer}
      onMouseLeave={hidePlayer}
    >
      <td className={classes.type}>
        <div>
          {call.in_out === 1 ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5217 7.17704L17.3447 6L7.66957 15.6751V10.1739H6V18.5217H14.3478V16.8522H8.84661L18.5217 7.17704Z"
                fill="#005FF8"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99999 17.3447L7.17703 18.5217L16.8522 8.8466V14.3478H18.5217V5.99999L10.1739 5.99999V7.66955L15.6751 7.66955L5.99999 17.3447Z"
                fill="#00C294"
              />
            </svg>
          )}
        </div>
      </td>
      <td className={classes.date}>{call.date.slice(10, 16)}</td>
      <td className={classes.user}>
        <div className={classes['user-image']}>
          {call.person_avatar && (
            <img
              src={call.person_avatar}
              alt="person_avatar"
            />
          )}
        </div>
      </td>
      <td className={classes.number}>{call.from_number}</td>
      <td className={classes.source}>{call.source}</td>
      <td className={classes.rating}>Оценка</td>
      <td className={classes.time}>
        {call.record && !active ? (
          formatTime(call.time)
        ) : call.record && active ? (
          <Suspense fallback={<Loading />}>
            <Player
              record={call.record}
              partnership_id={call.partnership_id}
            />
          </Suspense>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
};
export default TableRow;
