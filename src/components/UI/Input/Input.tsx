import classes from './Input.module.scss';
import React, { useImperativeHandle, useRef } from 'react';
import { IInputComponentProps } from '../../../models/IInput';

const Input: React.FC<IInputComponentProps> = React.forwardRef((props, ref): JSX.Element => {
  const { value, iconleft, iconright, onReset } = props;

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
        {React.isValidElement(iconleft) && <div className={classes.iconLeft}>{iconleft}</div>}
        <input
          {...props}
          className={`${classes.input} ${value && classes.active}`}
          autoComplete={'off'}
          ref={inputRef}
        />
        {React.isValidElement(iconright) && (
          <div
            className={classes.iconRight}
            onClick={onReset}
          >
            {iconright}
          </div>
        )}
      </div>
    </>
  );
});

export default Input;
