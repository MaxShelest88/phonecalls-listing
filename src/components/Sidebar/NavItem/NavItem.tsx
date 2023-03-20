import classes from './NavItem.module.scss';

interface NavItemProps {
  icon: string;
  text: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active }) => {
  return (
    <li className={`${classes.item} ${active && classes.active}`}>
      <div className={classes.icon}>
        <img
          src={icon}
          alt="navicon"
        />
      </div>
		  <div className={classes.text}>{text}</div>
		  {active && <div className={classes.circule} />}
    </li>
  );
};
export default NavItem;
