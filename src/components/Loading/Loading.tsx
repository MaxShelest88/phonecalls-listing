import classes from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={classes['spinner-container']}>
      <div className={classes.spinner} />
      <span className={classes.text}>Загружаем</span>
    </div>
  );
};
export default Loading;
