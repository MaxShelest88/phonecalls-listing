export const formatTime = (time: number): string => {
  time = Math.round(time);
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
};

export const formatDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
  const currentDateData = new Date();
  const currentDate = currentDateData.getDate();
  const itemDateData = new Date(date);
  const itemDate = itemDateData.getDate();
  let formatedDate: string;
  if (itemDate - currentDate === -1) {
    formatedDate = typeof date === 'string' ? 'вчера' : itemDateData.toLocaleString('ru', options);
  } else {
    formatedDate = itemDateData.toLocaleString('ru', options);
	}
	return formatedDate.replace(/\./, '')
};
