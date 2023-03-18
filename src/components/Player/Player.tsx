import React from 'react';
import { useEffect, useRef } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../utils/formatters';
import Loading from '../Loading/Loading';
import IconClose from '../UI/Icons/IconClose';
import IconPause from '../UI/Icons/IconPause';
import IconPlay from '../UI/Icons/IconPlay';
import classes from './Player.module.scss';

interface PlayerProps {
  record: string;
  partnership_id: string;
}

const Player: React.FC<PlayerProps> = ({ record, partnership_id }):JSX.Element => {
  const progressContainerRef = useRef<HTMLDivElement>(null);

  const {
    isLoading,
    error,
    text,
    fetchAudio,
    hideTip,
    showTip,
    play,
    rate,
    onStop,
    onPlay,
    reset,
    onProgressClick,
    position,
    tipIsVisible,
    duration,
    startedAt,
  } = usePlayer(record, partnership_id, progressContainerRef);

  useEffect(() => {
    fetchAudio();
    return () => {
      reset();
    };
  }, []);

  if (error) {
    return <div>Ошибка загрузки аудио</div>;
  }

  return (
    <div className={classes.player}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.time}>{duration && formatTime(duration)}</div>
          {!play ? (
            <button
              className={classes['btn-play']}
              onClick={onPlay}
            >
              <IconPlay color="#002CFB" />
            </button>
          ) : (
            <button
              className={classes['btn-play']}
              onClick={onStop}
            >
              <IconPause color="#002CFB" />
            </button>
          )}

          <div
            ref={progressContainerRef}
            className={classes['progress-container']}
            onClick={(e) => onProgressClick(e)}
            onMouseEnter={(e) => showTip(e)}
            onMouseLeave={hideTip}
          >
            <div
              className={classes['progress-bar']}
              style={{ width: `${rate}%` }}
            />
            {tipIsVisible && (
              <div
                className={classes.tooltip}
                style={{ left: `${position}px` }}
              >
                {text}
              </div>
            )}
          </div>
          <div className={classes.download}>
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16H13V14.1176H0V16ZM13 5.64706H9.28571V0H3.71429V5.64706H0L6.5 12.2353L13 5.64706Z"
                fill="#ADBFDF"
              />
            </svg>
          </div>
          {startedAt !== 0 && (
            <div
              onClick={reset}
              className={classes.close}
            >
              <IconClose
                size="24"
                color="#ADBFDF"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default React.memo(Player);
