import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import classes from './Player.module.scss';

interface PlayerProps {
  record?: string;
  partnership_id?: string;
}

const Player: React.FC<PlayerProps> = ({ record, partnership_id }): JSX.Element => {
  const ctx = new AudioContext();
  let audio: AudioBuffer;
  const sound = ctx.createBufferSource();
  const URL = process.env.REACT_APP_URL;
  const TOKEN = process.env.REACT_APP_TOKEN;

  //   const fetchAudio = async (record:string, partnership_id:string) => {
  //     const response = await fetch(
  //       `https://api.skilla.ru/mango/getRecord?record=${record}&partnership_id=${partnership_id}`,
  //       {
  //         method: 'POST',
  //         headers: { Authorization: `Bearer testtoken` },
  //       },
  //     );
  //     const data = await response.arrayBuffer();
  //     const decodedAudio = await ctx.decodeAudioData(data);
  //     audio = decodedAudio;
  //   };

  const fetchAudio = async () => {
    const { data } = await axios('https://api.skilla.ru/mango/getRecord', {
      method: 'POST',
      params: {
        record: 'MToxMDA2NzYxNToxNDMwMDM3NzExNzow',
        partnership_id: '578',
      },
      headers: { Authorization: `Bearer testtoken` },
      responseType: 'arraybuffer',
    });
    const decodedAudio = await ctx.decodeAudioData(data);
    audio = decodedAudio;
  };

  useEffect(() => {
    fetchAudio();
  }, []);

  const onPlay = () => {
    sound.buffer = audio;
    sound.connect(ctx.destination);
    sound.start(ctx.currentTime);
  };

  return (
    <div className={classes.player}>
      <button onClick={onPlay}>Play</button>
    </div>
  );
};
export default Player;
