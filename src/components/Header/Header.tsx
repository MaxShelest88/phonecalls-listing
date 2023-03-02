import AnalyticsItem from '../AnalyticsItem/AnalyticsItem';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import IconChevronDown from '../UI/Icons/IconChevronDown';
import classes from './Header.module.scss';
import userImage from '../../assets/img/user.png';

const Header: React.FC = () => {
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
        <div className={classes.organization__name}>ИП Сидорова Александра Михайловна</div>
        <div className={classes.organization__arrow}>
          <IconChevronDown color={'#ADBFDF'} />
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
