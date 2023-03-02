import AnalyticsItem from '../AnalyticsItem/AnalyticsItem';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import IconChevronDown from '../UI/Icons/IconChevronDown';
import classes from './Header.module.scss';
import userImage from '../../assets/img/user.png';
import DropDown from '../UI/DropDown/DropDown';
import { useState } from 'react';

export const listItems = [{}];

const Header: React.FC = () => {
  const [organization, setOrganization] = useState('ИП Сидорова Александра Михайловна');
  const [organizationIsVisible, setOrganizationIsVisible] = useState(false);
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
      <div className={classes.organization}>
        <div className={classes.organization__name}>{organization}</div>
        <div className={classes.organization__arrow}>
          <IconChevronDown color={'#ADBFDF'} />
        </div>
        <div className={classes.organization__dropdown}>
          <DropDown items={listItems} />
        </div>
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
