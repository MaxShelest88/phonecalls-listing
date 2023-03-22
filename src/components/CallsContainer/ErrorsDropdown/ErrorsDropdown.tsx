import { useState, useRef, useEffect } from 'react';
import IconChevronDown from '../../UI/Icons/IconChevronDown';
import classes from './ErrorsDropdown.module.scss';

const ErrorsDropdown: React.FC = (): JSX.Element => {
  const [dropdownVisible, setDropdownIsVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !e.composedPath().includes(dropdownRef.current)) {
        setDropdownIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${classes.container}  ${dropdownVisible ? classes.active : ''}`}>
      <div
        ref={dropdownRef}
        onClick={() => setDropdownIsVisible((prevVisible) => !prevVisible)}
      >
        Все оценки
      </div>
      <div className={`${classes.arrow} ${dropdownVisible ? classes.active : ''}`}>
        <IconChevronDown color={dropdownVisible ? '#005ff8' : '#ADBFDF'} />
      </div>
      {dropdownVisible && (
        <div className={classes.menu}>
          <ul>
            <li className={classes.item}>Все оценки</li>
            <li className={classes.item}>Распознать</li>
            <li className={classes.item}>Скрипт не использован</li>
            <li className={classes.item}>
              <div className={`${classes.btn} ${classes.red}`}>Плохо</div>
            </li>
            <li className={classes.item}>
              <div className={`${classes.btn} ${classes.grey}`}>Хорошо</div>
            </li>
            <li className={classes.item}>
              <div className={`${classes.btn} ${classes.green}`}>Отлично</div>
            </li>
            <li className={classes.item}>
              <div className={classes.dots}>
                <div className={`${classes.dot} ${classes['dot-red']}`} />
              </div>
            </li>
            <li className={classes.item}>
              <div className={classes.dots}>
                <div className={`${classes.dot} ${classes['dot-grey']}`} />
                <div className={`${classes.dot} ${classes['dot-grey']}`} />
              </div>
            </li>
            <li className={classes.item}>
              <div className={classes.dots}>
                <div className={`${classes.dot} ${classes['dot-green']}`} />
                <div className={`${classes.dot} ${classes['dot-green']}`} />
                <div className={`${classes.dot} ${classes['dot-green']}`} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default ErrorsDropdown;
