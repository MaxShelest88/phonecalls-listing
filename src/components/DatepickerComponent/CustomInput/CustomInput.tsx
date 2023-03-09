import { forwardRef } from 'react';
import classes from './CustomInput.module.scss';

const CustomInput: React.FC = forwardRef(
  (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => (
    <input
      {...props}
      ref={ref}
      className={classes.input}
    />
  ),
);

export default CustomInput;
