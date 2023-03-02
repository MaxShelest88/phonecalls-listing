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
  const organizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (organizationRef.current && !e.composedPath().includes(organizationRef.current)) {
        setOrganizationIsVisible(false);
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
          <IconChevronDown color={'#ADBFDF'} />
        </div>
        {organizationIsVisible && (
          <div className={classes.organization__dropdown}>
            <ul>
              {listItems.map((item, index) => (
                <li
                  className={`${classes.item} ${item.text===organization? classes.active : ''}`}
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
      <div className={classes.user}>
        <div className={classes.user__image}>
          <img
            src={userImage}
            alt="user avatar"
          />
        </div>
        <div className={classes.user__arrow}>
          <IconChevronDown color={'#ADBFDF'} />
        </div>
      </div>
    </div>
  );
};
export default Header;
