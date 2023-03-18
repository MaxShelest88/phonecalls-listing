import { useState } from 'react';

export const useInput = (validation: (value: string) => boolean) => {
  const [value, setValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const valueIsValid = validation(value);
  const inputHasError: boolean = !valueIsValid && isTouched;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
    setIsFocused(false);
  };

  const onFocusHandler = () => {
    setIsFocused(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return { value, onChangeHandler, onBlurHandler, inputHasError, reset, onFocusHandler, isFocused };
};
