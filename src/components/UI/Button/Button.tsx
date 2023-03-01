import classes from './Button.module.scss';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button className={classes.button}>{text}</button>;
};
export default Button;
