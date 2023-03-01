import classes from './NavItem.module.scss';

interface NavItemProps {
  icon: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => {
  return (
    <div className={classes.item}>
      <div>
        <img
          src={icon}
          alt="navicon"
        />
      </div>
      <div className={classes.text}>{text}</div>
    </div>
  );
};
export default NavItem;
