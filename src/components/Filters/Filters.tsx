import { IListItem } from '../../models/IListItem';
import ErrorsDropdown from '../ErrorsDropdown/ErrorsDropdown';
import Dropdown from '../Dropdown/Dropdown';
import IconClose from '../UI/Icons/IconClose';
import IconSearch from '../UI/Icons/IconSearch';
import Input from '../UI/Input/Input';
import avatar2 from '../../assets/img/avatar2.png';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import InputMask from 'react-input-mask';
import classes from './Filters.module.scss';
import { resetFilters, setDate, setType } from '../../store/reducers/filter/filterSlice';
import { IDate, IType } from '../../store/reducers/filter/types';
import IconAdd from '../UI/Icons/IconAdd';
import React from 'react';
import { subDays } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useCount } from '../../hooks/useCount';
import { ICall } from '../../models/ICallList';
const DatepickerComponent = React.lazy(
  () => import(/* webpackChunkName: "Datepicker" */ '../DatepickerComponent/DatepickerComponent'),
);

const datePikerListItems: IListItem[] = [
  { value: 2, name: '3 дня' },
  { value: 6, name: 'Неделя' },
  { value: 30, name: 'Месяц' },
  { value: 364, name: 'Год' },
];

const typesListItems: IListItem[] = [
  { value: -1, name: 'Все типы' },
  { value: 0, name: 'Исходящие' },
  { value: 1, name: 'Входящие' },
];

const personListItems: IListItem[] = [
  { value: 1, name: 'Все сотрудники' },
  { value: 2, name: 'Константин К.', img: avatar2 },
  { value: 3, name: 'Полина З.', img: avatar2 },
];

const numberListItems: IListItem[] = [
  { value: 1, name: 'Все звонки' },
  { value: 2, name: 'Все клиенты' },
  { value: 3, name: 'Новые клиенты', updates: true },
  { value: 4, name: 'Все исполнители' },
  { value: 5, name: 'Через приложение' },
  { value: 6, name: 'Прочие звонки' },
];

const ErrorListItems: IListItem[] = [
  { value: 1, name: 'Все ошибки' },
  { value: 2, name: 'Приветствие' },
  { value: 3, name: 'Имя' },
  { value: 4, name: 'Цена' },
  { value: 5, name: 'Скидка' },
  { value: 6, name: 'Предзаказ' },
  { value: 7, name: 'Благодарность' },
  { value: 8, name: 'Стоп слова' },
];

const sourceListItems: IListItem[] = [
  { value: 1, name: 'Все источники' },
  { value: 2, name: 'Rabota.ru' },
  { value: 3, name: 'Yandex' },
  { value: 4, name: 'Google' },
];

const Filters: React.FC<{ calls: ICall[] }> = ({ calls }): JSX.Element => {
  const isFilter = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const [count, setCount, onArrowClickHandler] = useCount(datePikerListItems);
  const [filtered, setFiltered] = useState<boolean>(false);
  const dateValue = useAppSelector((store) => store.filterReducer.dateValue);
  const typeFilter = useAppSelector((store) => store.filterReducer.typeValue);
  const { value, inputHasError, onBlurHandler, onChangeHandler, reset, onFocusHandler, isFocused } =
    useInput((value: string) => value.trim() !== '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFilter.current) {
      dispatch(
        setDate({
          startDate: subDays(new Date(), datePikerListItems[count].value).toString(),
          name: datePikerListItems[count].name,
        } as IDate),
      );
    }
    isFilter.current = true;
  }, [count, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      setFiltered([dateValue.isFilter, typeFilter.isFilter].includes(true));
    }
    isMounted.current = true;
  }, [dateValue.isFilter, typeFilter.isFilter]);

  const onTypeItemClickHandler = useCallback(
    (name: string, value: number) => {
      const typeValue = {
        value,
        name,
      } as IType;
      dispatch(setType(typeValue));
    },
    [dispatch],
  );

  const onResetHandler = useCallback(() => {
    dispatch(resetFilters());
    isFilter.current = false;
    setCount(0);
  }, [dispatch, setCount]);

  const onClickHandler = useCallback(() => {}, []);
  return (
    <div className={classes['filters-container']}>
      <div className={classes['datepicker-container']}>
        <div className={classes.balance}>
          <span className={classes['balance-text']}>Баланс:</span>
          <span className={classes['balance-number']}>272 ₽</span>
          <IconAdd
            color="#005FF8"
            size="24px"
          />
        </div>
        <Suspense fallback={''}>
          <DatepickerComponent
            items={datePikerListItems}
            endDate={new Date(dateValue.endDate)}
            startDate={new Date(dateValue.startDate)}
            calls={calls || []}
            selectedValue={dateValue.name}
            onArrowClickHandler={onArrowClickHandler}
          />
        </Suspense>
      </div>
      <div className={classes['filers-block']}>
        <div className={classes.search}>
          <InputMask
            mask="+7 (999) 999-99-99"
            maskPlaceholder={''}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          >
            <Input
              name="callsSearch"
              placeholder="Поиск по звонкам"
              type="tel"
              ref={inputRef}
              onReset={reset}
              error={inputHasError.current ? 1 : 0}
              iconleft={
                <IconSearch
                  size="16px"
                  color={'#ADBFDF'}
                />
              }
              iconright={
                (isFocused || value) && (
                  <IconClose
                    size="24px"
                    color={'#ADBFDF'}
                  />
                )
              }
            />
          </InputMask>
        </div>
        <div className={classes.filters}>
          {filtered && (
            <div
              onClick={onResetHandler}
              className={classes.reset}
            >
              <span>Сбросить фильтры</span>
              <IconClose
                size="15px"
                color="#ADBFDF"
              />
            </div>
          )}
          <Dropdown<IListItem>
            items={typesListItems}
            onClickItem={onTypeItemClickHandler}
            selectedItem={typeFilter}
            filtered={typeFilter.isFilter}
          />
          <Dropdown<IListItem>
            items={personListItems}
            onClickItem={onClickHandler}
            selectedItem={personListItems[0]}
            filtered={false}
          />
          <Dropdown<IListItem>
            items={numberListItems}
            onClickItem={onClickHandler}
            selectedItem={numberListItems[0]}
            filtered={false}
          />
          <Dropdown<IListItem>
            items={sourceListItems}
            onClickItem={onClickHandler}
            selectedItem={sourceListItems[0]}
            filtered={false}
          />
          <Dropdown<IListItem>
            items={ErrorListItems}
            onClickItem={onClickHandler}
            selectedItem={ErrorListItems[0]}
            filtered={false}
          />
          <ErrorsDropdown />
        </div>
      </div>
    </div>
  );
};
export default React.memo(Filters);
