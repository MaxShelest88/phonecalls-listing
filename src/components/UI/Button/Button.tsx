import classes from './Button.module.scss';

interface ButtonProps {
  icon: string;
  text: string;
  pl: number;
}

const Button: React.FC<ButtonProps> = ({ icon, text, pl }) => {
  return (
    <button className={classes.button}>
      <span
        className={classes.text}
        style={{ paddingLeft: pl }}
      >
        {text}
      </span>
      <img
        className={classes.icon}
        src={icon}
        alt=""
      />
    </button>
  );
};
export default Button;
