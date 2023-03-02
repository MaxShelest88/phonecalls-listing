import { useRef, useState } from 'react';
import { useInput } from '../../hooks/useIntput';
import IconClose from '../UI/Icons/IconClose';
import IconSearch from '../UI/Icons/IconSearch';
import Input from '../UI/Input/Input';
import classes from './HeaderSearch.module.scss';

const HeaderSearch = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { value, inputHasError, onBlurHandler, onChangeHandler, reset, onFocusHandler, isFocused } =
    useInput((value: string) => value.trim() !== '');
  const inputRef = useRef<HTMLInputElement>(null);

  const resetHandler = () => {
    inputRef.current?.focus();
    reset();
  };

  return (
    <div className={classes.container}>
      <div>
        <Input
          name="search"
          type="text"
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          error={inputHasError}
          onFocus={onFocusHandler}
          ref={inputRef}
          reset={resetHandler}
          iconLeft={
            (isFocused || value) && (
              <IconSearch
                size="16px"
                color={'#ADBFDF'}
              />
            )
          }
          iconRight={
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
    </div>
  );
};
export default HeaderSearch;
