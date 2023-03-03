import AnalyticsItem from '../AnalyticsItem/AnalyticsItem';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import IconChevronDown from '../UI/Icons/IconChevronDown';
import classes from './Header.module.scss';
import userImage from '../../assets/img/user.png';
import DropDown from '../UI/DropDown/DropDown';
import { useEffect, useRef, useState } from 'react';

export const listItems = [
  { text: 'Все организации' },
  { text: 'ИП Сидорова Александра Михайловна' },
  { text: 'ООО Грузчиков Сервис Запад' },
  { text: 'ИП Иванов М.М.' },
];

const Header: React.FC = () => {
  const [organization, setOrganization] = useState('ИП Сидорова Александра Михайловна');
  const [organizationIsVisible, setOrganizationIsVisible] = useState(false);
  const [userIsVisible, setUserIsVisible] = useState(false);
  const organizationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (organizationRef.current && !e.composedPath().includes(organizationRef.current)) {
        setOrganizationIsVisible(false);
      }
      if (userRef.current && !e.composedPath().includes(userRef.current)) {
        setUserIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClickHandler = (value: string) => {
    setOrganization(value);
    setOrganizationIsVisible(false);
  };
  return (
    <div className={classes.header}>
      <div className={classes.date}>Среда, 13 окт</div>
      <div className={classes.analytics}>
        <AnalyticsItem
          text="Новые звонки"
          data="20 из 30 шт"
          color="#00A775"
          width="162px"
        />
        <AnalyticsItem
          text="Качество разговоров"
          data="40%"
          color="#FFD500"
          width="164px"
        />
        <AnalyticsItem
          text="Конверсия в заказ"
          data="67%"
          color="#EA1A4F"
          width="156px"
        />
      </div>
      <div className={classes.search}>
        <HeaderSearch />
      </div>
      <div
        ref={organizationRef}
        className={classes.organization}
      >
        <div
          onClick={() => setOrganizationIsVisible((prevState) => !prevState)}
          className={classes.organization__name}
        >
          {organization}
        </div>
        <div
          className={`${classes.organization__arrow} ${
            organizationIsVisible ? classes.active : ''
          }`}
        >
          <IconChevronDown color={organizationIsVisible ? '#005ff8' : '#ADBFDF'} />
        </div>
        {organizationIsVisible && (
          <div className={classes.organization__dropdown}>
            <ul>
              {listItems.map((item, index) => (
                <li
                  className={`${classes.item} ${item.text === organization ? classes.active : ''}`}
                  key={index}
                  onClick={() => onClickHandler(item.text)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        ref={userRef}
        className={classes.user}
      >
        <div
          onClick={() => setUserIsVisible((prevState) => !prevState)}
          className={classes.user__image}
        >
          <img
            src={userImage}
            alt="user avatar"
          />
        </div>
        <div className={`${classes.user__arrow} ${userIsVisible ? classes.active : ''}`}>
          <IconChevronDown color={userIsVisible ? '#005ff8' : '#ADBFDF'} />
        </div>
        {!userIsVisible && (
          <div className={classes.user__dropdown}>
            <div className={classes.user__card}>
              <div className={classes.user__header}>
                <div className={classes.user__name}>Упоров Кирилл</div>
                <div className={classes.user__exitIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5676_871)">
                      <path
                        d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z"
                        fill="#ADBFDF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5676_871">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className={classes.user__desc}>
                Директор
                <div className={classes.user__dott} />
                Санкт-Петербург
              </div>
              <div className={classes.user__contacts}>
                <div className={classes.user__tel}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.36 1.33333C2.4 1.92667 2.5 2.50667 2.66 3.06L1.86 3.86C1.58667 3.06 1.41333 2.21333 1.35333 1.33333H2.36V1.33333ZM8.93333 9.34667C9.5 9.50667 10.08 9.60667 10.6667 9.64667V10.64C9.78667 10.58 8.94 10.4067 8.13333 10.14L8.93333 9.34667V9.34667ZM3 0H0.666667C0.3 0 0 0.3 0 0.666667C0 6.92667 5.07333 12 11.3333 12C11.7 12 12 11.7 12 11.3333V9.00667C12 8.64 11.7 8.34 11.3333 8.34C10.5067 8.34 9.7 8.20667 8.95333 7.96C8.88667 7.93333 8.81333 7.92667 8.74667 7.92667C8.57333 7.92667 8.40667 7.99333 8.27333 8.12L6.80667 9.58667C4.92 8.62 3.37333 7.08 2.41333 5.19333L3.88 3.72667C4.06667 3.54 4.12 3.28 4.04667 3.04667C3.8 2.3 3.66667 1.5 3.66667 0.666667C3.66667 0.3 3.36667 0 3 0Z"
                      fill="#ADBFDF"
                    />
                  </svg>
                  <a href="tel:8800333-17-21">8 (800) 333-17-21</a>
                </div>
                <div className={classes.user__mail}>
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.3333 0.666656H1.66659C0.933252 0.666656 0.339919 1.26666 0.339919 1.99999L0.333252 9.99999C0.333252 10.7333 0.933252 11.3333 1.66659 11.3333H12.3333C13.0666 11.3333 13.6666 10.7333 13.6666 9.99999V1.99999C13.6666 1.26666 13.0666 0.666656 12.3333 0.666656ZM12.3333 9.99999H1.66659V3.33332L6.99992 6.66666L12.3333 3.33332V9.99999ZM6.99992 5.33332L1.66659 1.99999H12.3333L6.99992 5.33332Z"
                      fill="#ADBFDF"
                    />
                  </svg>
                  <a href="mailto:hi@skilla.ru">hi@skilla.ru</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
