const Player = ({ src }) => {
  return (
    <audio controls>
      <source
        src={src}
        type="audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3"
      />
    </audio>
  );
};
export default Player;
