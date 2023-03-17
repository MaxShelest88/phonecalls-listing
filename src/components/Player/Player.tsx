import axios, { AxiosError } from 'axios';
import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
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

const Player: React.FC<PlayerProps> = ({ record, partnership_id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [startedAt, setStartedAt] = useState<number>(0);
  const [stoppedAt, setStoppedAt] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [play, setPlay] = useState(false);
  const audioCtxContainer = useRef<AudioContext | undefined>();
  const audioRef = useRef<AudioBuffer | undefined>();
  audioCtxContainer.current = new AudioContext();
  const sourceRef = useRef<AudioBufferSourceNode | undefined>();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [position, setPosition] = useState(0);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  const showTip = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickX = e.clientX - progressContainerRef.current!.getBoundingClientRect().left;
    const width = progressContainerRef.current?.offsetWidth;
    setPosition(clickX);
    const duration = audioRef.current && audioRef.current.duration;
    const playbackTime = (clickX / width!) * duration!;
    setText(formatTime(playbackTime));
    setVisible(true);
  }, []);

  const hideTip = () => {
    setVisible(false);
  };

  const fetchAudio = async (record: string, partnership_id: string) => {
    if (record) {
      setIsLoading(true);
      try {
        const { data } = await axios('getRecord', {
          baseURL: process.env.REACT_APP_URL,
          method: 'POST',
          params: {
            record,
            partnership_id,
          },
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
          responseType: 'arraybuffer',
        });
        const decodedAudio = await audioCtxContainer?.current?.decodeAudioData(data);
        audioRef.current = decodedAudio;
        setIsLoading(false);
      } catch (AxiosError) {
        const error = AxiosError as AxiosError;
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAudio(record, partnership_id);
    return () => {
      setRate(0);
      setPlay(false);
      setStartedAt(0);
      setStoppedAt(0);
      sourceRef.current?.stop();
      sourceRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = audioRef.current?.duration;
      if (play && duration) {
        const playbackTime = (Date.now() - startedAt) / 1000;
        const progressPercent = Math.round((playbackTime * 100) / duration);
        setRate(progressPercent);
        if (playbackTime > duration) {
          setRate(0);
          clearInterval(interval);
          setPlay(false);
          setStartedAt(0);
          sourceRef.current?.stop();
          sourceRef.current?.disconnect();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [play, rate, startedAt]);

  const onPlay = useCallback(() => {
    if (audioCtxContainer.current?.state === 'suspended') {
      audioCtxContainer.current.resume();
    }
    sourceRef.current = audioCtxContainer?.current?.createBufferSource();
    if (sourceRef.current && audioCtxContainer.current) {
      sourceRef.current.buffer = audioRef.current as AudioBuffer;
      sourceRef.current.connect(audioCtxContainer.current.destination);
      sourceRef.current.start(0, stoppedAt / 1000);
      setPlay(true);
      setStartedAt(Date.now() - stoppedAt);
    }
  }, [stoppedAt]);

  const onStop = useCallback(() => {
    sourceRef.current?.stop();
    setPlay(false);
    setStoppedAt(Date.now() - startedAt);
  }, [startedAt]);

  const reset = () => {
    setRate(0);
    setPlay(false);
    setStartedAt(0);
    setStoppedAt(0);
    sourceRef.current?.stop();
  };

  const onProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    let width;
    if (audioCtxContainer.current?.state === 'suspended') {
      audioCtxContainer.current.resume();
    }
    if (target.parentElement?.className.includes('progress-container')) {
      width = target.parentElement.offsetWidth;
    } else {
      width = target.offsetWidth;
    }
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current && audioRef.current.duration;
    sourceRef.current?.disconnect();
    sourceRef.current = audioCtxContainer?.current?.createBufferSource();
    if (sourceRef.current && duration && audioCtxContainer.current) {
      sourceRef.current.buffer = audioRef.current as AudioBuffer;
      sourceRef.current.connect(audioCtxContainer.current.destination);
      const playbackTime = (clickX / width) * duration;
      setRate(Math.round((playbackTime * 100) / duration));
      sourceRef.current.start(0, playbackTime);
      setPlay(true);
      setStartedAt(Date.now() - playbackTime * 1000);
    }
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
          <div className={classes.time}>
            {audioRef.current && formatTime(audioRef.current.duration)}
          </div>
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
            {visible && (
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
