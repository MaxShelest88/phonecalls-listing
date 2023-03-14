const Player = () => {
	
  return (
    <audio controls>
      <source
        src="myAudio.mp3"
        type="audio/mpeg"
      />
      <source
        src="myAudio.ogg"
        type="audio/ogg"
      />
      <p>
        Ваш браузер не поддерживает HTML5 аудио. Вот взамен
        <a href="myAudio.mp4">ссылка на аудио</a>
      </p>
    </audio>
  );
};
export default Player;
