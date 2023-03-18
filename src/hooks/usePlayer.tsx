import axios, { AxiosError } from 'axios';
import { useState, useRef, useEffect } from 'react';
import { formatTime } from '../utils/formatters';

export const usePlayer = (
  record: string,
  partnership_id: string,
  ref: React.RefObject<HTMLDivElement>,
) => {
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
  const [tipIsVisible, setTipIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [position, setPosition] = useState(0);

  const showTip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickX = e.clientX - ref.current!.getBoundingClientRect().left;
    const width = ref.current?.offsetWidth;
    setPosition(clickX);
    const duration = audioRef.current && audioRef.current.duration;
    const playbackTime = (clickX / width!) * duration!;
    setText(formatTime(playbackTime));
    setTipIsVisible(true);
  };

  const hideTip = () => {
    setTipIsVisible(false);
  };

  const fetchAudio = async () => {
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

  const onPlay = () => {
    sourceRef.current = audioCtxContainer?.current?.createBufferSource();
    if (sourceRef.current && audioCtxContainer.current) {
      sourceRef.current.buffer = audioRef.current as AudioBuffer;
      sourceRef.current.connect(audioCtxContainer.current.destination);
      sourceRef.current.start(0, stoppedAt / 1000);
      setPlay(true);
      setStartedAt(Date.now() - stoppedAt);
    }
  };

  const onStop = () => {
    sourceRef.current?.stop();
    setPlay(false);
    setStoppedAt(Date.now() - startedAt);
  };

  const reset = () => {
    setRate(0);
    setPlay(false);
    setStartedAt(0);
    setStoppedAt(0);
    sourceRef.current?.stop();
    audioCtxContainer.current?.close();
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    let width;
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
  };

  return {
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
    audioRef,
    startedAt,
  };
};
