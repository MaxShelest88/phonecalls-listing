import IconClose from 'components/UI/Icons/IconClose';
import IconSearch from 'components/UI/Icons/IconSearch';
import Input from 'components/UI/Input/Input';
import { useInput } from 'hooks/useInput';
import { useRef, useState } from 'react';

import classes from './HeaderSearch.module.scss';

const HeaderSearch: React.FC = (): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { value, inputHasError, onBlurHandler, onChangeHandler, reset, onFocusHandler, isFocused } =
    useInput((value: string) => value.trim() !== '');
  const inputRef = useRef<HTMLInputElement>(null);

  const resetHandler = () => {
    inputRef.current?.focus();
    reset();
  };

  const onBlur = () => {
    onBlurHandler();
    setIsHovered(false);
  };

  return (
    <div className={classes.container}>
      <Input
        name="headerSearch"
        type="text"
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
        error={inputHasError ? 1 : 0}
        onFocus={onFocusHandler}
        ref={inputRef}
        onReset={resetHandler}
        iconleft={
          (isFocused || value) && (
            <IconSearch
              size="16px"
              color={'#ADBFDF'}
            />
          )
        }
        iconright={
          isFocused || value ? (
            <IconClose
              size="24px"
              color={'#ADBFDF'}
            />
          ) : (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <IconSearch
                size="16px"
                color={`${isHovered ? '#005FF8' : '#ADBFDF'}`}
              />
            </div>
          )
        }
      />
    </div>
  );
};
export default HeaderSearch;
