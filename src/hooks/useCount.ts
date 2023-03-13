import { useCallback, useState } from 'react';

export const useCount = <T>(
  listItems: T[],
): [number, React.Dispatch<React.SetStateAction<number>>, (type: string) => void] => {
  const [count, setCount] = useState<number>(0);
  const itemsNumber = listItems.length;
  const onClickHandler = useCallback(
    (type: string) => {
      switch (type) {
        case 'left': {
          if (count === 0) {
            setCount(itemsNumber);
          }
          setCount((prevCount) => prevCount - 1);
          break;
        }
        case 'right': {
          setCount((prevCount) => prevCount + 1);
          if (count >= itemsNumber - 1) {
            setCount(0);
          }
          break;
        }
      }
    },
    [count, itemsNumber],
  );
  return [count, setCount, onClickHandler];
};
