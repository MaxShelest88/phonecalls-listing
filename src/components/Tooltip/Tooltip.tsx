import { useState } from 'react';
import classes from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
  ms?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ text, ms = 800, children }): JSX.Element => {
  const [active, setActive] = useState(false);

  let timerId: ReturnType<typeof setTimeout>;

  const showTip = () => {
    timerId = setTimeout(() => setActive(false), ms);
    setActive(true);
  };

  const hideTip = () => {
	  clearInterval(timerId);
	  setActive(false);
  };

  return (
    <div
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      className={classes.wrapper}
    >
      {children}
      {active && <div className={classes.tooltip}>{text}</div>}
    </div>
  );
};
export default Tooltip;
