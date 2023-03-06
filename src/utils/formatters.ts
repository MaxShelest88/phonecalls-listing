export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes} : ${seconds >= 10 ? seconds : '0' + seconds}`;
};
