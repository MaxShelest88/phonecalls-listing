export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
};

export const formatDate = (date: string) => {
	const currentDate = new Date();
};
