import classes from './Sidebar.module.scss';
import logo from '../../assets/icons/logo.svg';
import chartIcon from '../../assets/icons/chart-timeline-variant.svg';
import ordersIcon from '../../assets/icons/orders-24px.svg';
import messageIcon from '../../assets/icons/mail_outline-24px.svg';
import peopleIcon from '../../assets/icons/people-24px.svg';
import documentIcon from '../../assets/icons/documents-24px.svg';
import executorIcon from '../../assets/icons/perm_identity_black_24dp.svg';
import caseIcon from '../../assets/icons/briefcase-outline.svg';
import knowlageIcon from '../../assets/icons/local_library_black_24dp.svg';
import settingsIcon from '../../assets/icons/settings-24px.svg';
import NavItem from '../UI/NavItem/NavItem';


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
    </aside>
  );
};
export default Sidebar;
