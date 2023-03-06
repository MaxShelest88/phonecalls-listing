export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const currentDateData = new Date();
  const currentDate = currentDateData.getDate();
  const itemDateData = new Date(date);
  const itemDate = itemDateData.getDate();
  if (itemDate - currentDate === -1) {
    return 'Вчера';
  } else {
    return itemDateData.toLocaleString('ru', options);
  }
};
