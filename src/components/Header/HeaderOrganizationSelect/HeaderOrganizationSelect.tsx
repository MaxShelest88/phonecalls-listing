import { useEffect, useRef, useState } from 'react';
import IconChevronDown from '../../UI/Icons/IconChevronDown';
import classes from './HeaderOrganizationSelect.module.scss';

export const listItems = [
  { text: 'Все организации' },
  { text: 'ИП Сидорова Александра Михайловна' },
  { text: 'ООО Грузчиков Сервис Запад' },
  { text: 'ИП Иванов М.М.' },
];

const HeaderOrganizationSelect: React.FC = (): JSX.Element => {
  const [organization, setOrganization] = useState<string>('ИП Сидорова Александра Михайловна');
  const [organizationIsVisible, setOrganizationIsVisible] = useState<boolean>(false);
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
    <div className={classes.container}>
      <div
        ref={organizationRef}
        onClick={() => setOrganizationIsVisible((prevState) => !prevState)}
        className={`${classes.name} ${organizationIsVisible ? classes.active : ''}`}
      >
        {organization}
      </div>
      <div className={`${classes.arrow} ${organizationIsVisible ? classes.active : ''}`}>
        <IconChevronDown color={organizationIsVisible ? '#005ff8' : '#ADBFDF'} />
      </div>
      {organizationIsVisible && (
        <div className={classes.dropdown}>
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
  );
};
export default HeaderOrganizationSelect;
