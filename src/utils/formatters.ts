export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
};

export const formatDate = (date: string):string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };
  const currentDateData = new Date();
  const currentDate = currentDateData.getDate();
  const itemDateData = new Date(date);
  const itemDate = itemDateData.getDate();
  if (itemDate - currentDate === -1) {
    return 'вчера';
  } else {
    return itemDateData.toLocaleString('ru', options);
  }
};
