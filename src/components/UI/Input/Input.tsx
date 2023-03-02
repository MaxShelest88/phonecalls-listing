import classes from './Input.module.scss';
import React, { useImperativeHandle, useRef } from 'react';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  placeholder?: string;
  name: string;
  type?: string;
  error?: boolean;
  onBlur: () => void;
  onFocus: () => void;
  reset: () => void;
  ref?: React.Ref<HTMLInputElement> | null;
}

const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  const {
    onChange,
    onFocus,
    value,
    iconLeft,
    iconRight,
    placeholder,
    name,
    type = 'text',
    onBlur,
    reset,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const onFocusHandler = () => {
    inputRef.current?.focus();
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        focus: onFocusHandler,
      } as HTMLInputElement),
  );

  return (
    <>
      <div className={classes.container}>
        {iconLeft && <div className={classes.iconLeft}>{iconLeft}</div>}
        <input
          type={type}
          placeholder={placeholder}
          onFocus={onFocus}
          name={name}
          onChange={onChange}
          value={value}
          className={`${classes.input} ${value && classes.active}`}
          autoComplete={'off'}
          onBlur={onBlur}
          ref={inputRef}
        />
        {iconRight && (
          <div
            className={classes.iconRight}
            onClick={() => reset()}
          >
            {iconRight}
          </div>
        )}
      </div>
    </>
  );
});

export default Input;
