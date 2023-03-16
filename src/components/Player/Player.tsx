import axios, { AxiosError } from 'axios';
import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import IconPause from '../UI/Icons/IconPause';
import IconPlay from '../UI/Icons/IconPlay';
import classes from './Player.module.scss';

interface PlayerProps {
  record?: string;
  partnership_id?: string;
}

const Player: React.FC<PlayerProps> = ({ record, partnership_id }): JSX.Element => {
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

  const URL = process.env.REACT_APP_URL;
  const TOKEN = process.env.REACT_APP_TOKEN;

  const fetchAudio = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios('getRecord', {
        baseURL: URL,
        method: 'POST',
        params: {
          record: 'MToxMDA2NzYxNToxNDMwMDM3NzExNzow',
          partnership_id: '578',
        },
        headers: { Authorization: `Bearer ${TOKEN}` },
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
  };

  useEffect(() => {
    fetchAudio();
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

	function onProgressClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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
  }

  if (error) {
    return <div>Ошибка загрузки аудио: {error}</div>;
  }

  return (
    <div className={classes.player}>
      <div className={classes.time}>{audioRef.current && audioRef.current.duration}</div>
      {!play ? (
        <button
          className={classes['btn-play']}
          onClick={onPlay}
          disabled={isLoading}
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
        className={classes['progress-container']}
        onClick={(e) => onProgressClick(e)}
      >
        <div
          className={classes.progress}
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
};
export default React.memo(Player);
