import classes from './Sidebar.module.scss';
import logo from '../../assets/icons/sidebar/logo.svg';
import chartIcon from '../../assets/icons/sidebar/chart-timeline-variant.svg';
import ordersIcon from '../../assets/icons/sidebar/orders-24px.svg';
import messageIcon from '../../assets/icons/sidebar/mail_outline-24px.svg';
import callIcon from '../../assets/icons/sidebar/calls-24px.svg';
import peopleIcon from '../../assets/icons/sidebar/people-24px.svg';
import documentIcon from '../../assets/icons/sidebar/documents-24px.svg';
import executorIcon from '../../assets/icons/sidebar/perm_identity_black_24dp.svg';
import caseIcon from '../../assets/icons/sidebar/briefcase-outline.svg';
import knowlageIcon from '../../assets/icons/sidebar/local_library_black_24dp.svg';
import settingsIcon from '../../assets/icons/sidebar/settings-24px.svg';
import NavItem from './NavItem/NavItem';
import Button from '../UI/Button/Button';
import addIcon from '../../assets/icons/sidebar/button/primary/Vector.svg';
import payIcon from '../../assets/icons/sidebar/button/pay/Vector.svg';
import IconAdd from '../UI/Icons/IconAdd';

const Sidebar: React.FC = () => {
  return (
    <aside className={classes.side}>
      <div className={classes.logo}>
        <img
          src={logo}
          alt="logo"
        />
      </div>
      <nav className={classes.menu}>
        <ul className={classes.list}>
          <NavItem
            icon={chartIcon}
            text="Итоги"
          />
          <NavItem
            icon={ordersIcon}
            text="Заказы"
          />
          <NavItem
            icon={messageIcon}
            text="Сообщения"
          />
          <NavItem
            icon={callIcon}
            text="Звонки"
            active
          />
          <NavItem
            icon={peopleIcon}
            text="Контрагенты"
          />
          <NavItem
            icon={documentIcon}
            text="Документы"
          />
          <NavItem
            icon={executorIcon}
            text="Исполнители"
          />
          <NavItem
            icon={caseIcon}
            text="Отчеты"
          />
          <NavItem
            icon={knowlageIcon}
            text="База знаний"
          />
          <NavItem
            icon={settingsIcon}
            text="Настройки"
          />
        </ul>
      </nav>
      <div className={classes.actions}>
        <Button
          pl={24}
          icon={
            <IconAdd
              size="24"
              opacity="0.56"
              color="#D8E4FB"
            />
          }
          text="Добавить заказ"
        />
        <Button
          pl={65}
          icon={payIcon}
          text="Оплата"
        />
      </div>
    </aside>
  );
};
export default Sidebar;
