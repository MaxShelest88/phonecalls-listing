
import { IButtonComponentProps } from '../../../models/IButton';
import classes from './Button.module.scss';

const Button: React.FC<IButtonComponentProps> = ({ icon, text, pl }) => {
  return (
    <button className={classes.button}>
      <span
        className={classes.text}
        style={{ paddingLeft: pl }}
      >
        {text}
      </span>
      {typeof icon === 'string' ? (
        <img
          className={classes.icon}
          src={icon}
          alt=""
        />
      ) : (
        <div className={classes.icon}>{icon}</div>
      )}
    </button>
  );
};
export default Button;
