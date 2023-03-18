import classes from './AnalyticsItem.module.scss';

interface AnalyticsItemProps {
  text: string;
  data: string;
  color: string;
  width: string;
}

const AnalyticsItem: React.FC<AnalyticsItemProps> = ({ text, data, color, width }): JSX.Element => {
  return (
    <div
      className={classes.item}
      style={{ flex: `0 0 ${width}` }}
    >
      <div className={classes.text}>
        <span>{`${text} `}</span>
        <span style={{ color: color }}>{`${data}`}</span>
      </div>
      <div className={classes.barContainer}>
        <div
          className={classes.bar}
          style={{ backgroundColor: color, width: '68px' }}
        />
      </div>
    </div>
  );
};
export default AnalyticsItem;
