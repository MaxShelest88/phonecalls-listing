import { useState, useCallback, useRef } from 'react';

export const useInput = (validation: (value: string) => boolean) => {
  const [value, setValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const valueIsValidRef = useRef<boolean>(validation(value));
  const inputHasError= useRef(!valueIsValidRef.current && isTouched);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  },[]);

  const onBlurHandler = useCallback(() => {
    setIsTouched(true);
    setIsFocused(false);
  },[]);

  const onFocusHandler = useCallback(() => {
    setIsFocused(true);
  },[]);

  const reset = useCallback(() => {
    setValue('');
    setIsTouched(false);
  },[]);

  return { value, onChangeHandler, onBlurHandler, inputHasError, reset, onFocusHandler, isFocused };
};
