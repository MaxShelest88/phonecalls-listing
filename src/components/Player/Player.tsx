import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import IconPlay from '../UI/Icons/IconPlay';
import classes from './Player.module.scss';

interface PlayerProps {
  record?: string;
  partnership_id?: string;
}

const Player: React.FC<PlayerProps> = ({ record, partnership_id }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const audioCtxContainer = useRef(null);
  audioCtxContainer.current = new AudioContext();
  const audioRef = useRef();
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
      const decodedAudio = await audioCtxContainer.current.decodeAudioData(data);
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

  const onPlay = () => {
    const source = audioCtxContainer.current.createBufferSource();
    source.buffer = audioRef.current;
    source.connect(audioCtxContainer.current.destination);
    source.start(audioCtxContainer.current.currentTime);
  };

  //   const onStop = () => {
  //     source.buffer = audio;
  //     source.connect(ctx.destination);
  //     source.stop(ctx.currentTime);
  //   };

  return (
    <div className={classes.player}>
      <div className={classes.time}></div>
      <button
        className={classes['btn-play']}
        onClick={onPlay}
      >
        <IconPlay color="#002CFB" />
      </button>
      <div className={classes['progress-container']}>
        <div className={classes.progress} />
      </div>
    </div>
  );
};
export default Player;
