import { forwardRef } from 'react';
import classes from './CustomInput.module.scss';

const CustomInput: React.FC = forwardRef(
  (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>):JSX.Element => (
    <input
      {...props}
      ref={ref}
      className={classes.input}
    />
  ),
);

export default CustomInput;
