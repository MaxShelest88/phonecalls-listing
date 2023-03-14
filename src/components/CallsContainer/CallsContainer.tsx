import { useEffect, useMemo, useRef, useState } from 'react';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import DatepickerComponent from '../DatepickerComponent/DatepickerComponent';
import { useCalls } from '../../hooks/useCalls';
import IconAdd from '../UI/Icons/IconAdd';
import DropDown from '../Dropdown/DropDown';
import { callApi } from '../../services/CallService';
import { useCount } from '../../hooks/useCount';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetFilters, setDate, setType } from '../../store/reducers/filter/filterSlice';
import { subDays } from 'date-fns';
import { IDate, IType } from '../../store/reducers/filter/types';
import { IListItem } from '../../models/IListItem';
import IconClose from '../UI/Icons/IconClose';
import avatar2 from '../../assets/img/avatar2.png';
import ErrorsDropdown from './ErrorsDropdown/ErrorsDropdown';
import IconSearch from '../UI/Icons/IconSearch';
import { useInput } from '../../hooks/useInput';
import Input from '../UI/Input/Input';

const CallsContainer = () => {
  const datePikerListItems: IListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const typesListItems = useMemo(() => {
    return [
      { value: -1, name: 'Все типы' },
      { value: 0, name: 'Исходящие' },
      { value: 1, name: 'Входящие' },
    ];
  }, []);
  const personListItems: IListItem[] = useMemo(() => {
    return [
      { value: 1, name: 'Все сотрудники' },
      { value: 2, name: 'Константин К.', img: avatar2 },
      { value: 3, name: 'Полина З.', img: avatar2 },
    ];
  }, []);
  const numberListItems: IListItem[] = useMemo(() => {
    return [
      { value: 1, name: 'Все звонки' },
      { value: 2, name: 'Все клиенты' },
      { value: 3, name: 'Новые клиенты', updates: true },
      { value: 4, name: 'Все исполнители' },
      { value: 5, name: 'Через приложение' },
      { value: 6, name: 'Прочие звонки' },
    ];
  }, []);
  const ErrorListItems: IListItem[] = useMemo(() => {
    return [
      { value: 1, name: 'Все ошибки' },
      { value: 2, name: 'Приветствие' },
      { value: 3, name: 'Имя' },
      { value: 4, name: 'Цена' },
      { value: 5, name: 'Скидка' },
      { value: 6, name: 'Предзаказ' },
      { value: 7, name: 'Благодарность' },
      { value: 8, name: 'Стоп слова' },
    ];
  }, []);
  const sourceListItems: IListItem[] = useMemo(() => {
    return [
      { value: 1, name: 'Все источники' },
      { value: 2, name: 'Rabota.ru' },
      { value: 3, name: 'Yandex' },
      { value: 4, name: 'Google' },
    ];
  }, []);

	const { data: calls, isLoading, error } = callApi.useFetchAllCallsQuery(process.env.REACT_APP_TOKEN as string);
	console.log(calls);
	
  const dateValue = useAppSelector((store) => store.filterReducer.dateValue);
  const isFilter = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const [count, setCount, onArrowClickHandler] = useCount(datePikerListItems);
  const [filtered, setFiltered] = useState<boolean>(false);
  const typeFilter = useAppSelector((store) => store.filterReducer.typeValue);
  const groupedCallsObj = useCalls(
    calls || [],
    dateValue.startDate || '',
    dateValue.endDate || '',
    typeFilter.value,
  );
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
  }, [count, datePikerListItems, dispatch]);

  useEffect(() => {
    setFiltered([dateValue.isFilter, typeFilter.isFilter].includes(true));
  }, [dateValue.isFilter, typeFilter.isFilter]);

  const onTypeItemClickHandler = (name: string, value: number) => {
    const typeValue = {
      value,
      name,
    } as IType;
    dispatch(setType(typeValue));
  };

  const onResetHandler = () => {
    dispatch(resetFilters());
    isFilter.current = false;
    setCount(0);
  };

  // todo: usedeboune и фильтрацию по телефонам с использованием маски; декомпозиция callscontainer

  const onClickHandler = () => {};

  return (
    <>
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
          {!isLoading && !error && (
            <DatepickerComponent
              items={datePikerListItems}
              endDate={new Date(dateValue.endDate)}
              startDate={new Date(dateValue.startDate)}
              calls={calls || []}
              selectedValue={dateValue.name}
              onArrowClickHandler={onArrowClickHandler}
            />
          )}
        </div>
        <div className={classes['filers-block']}>
          <div className={classes.search}>
            <Input
              name="callsSearch"
              type="text"
              value={value}
              placeholder="Поиск по звонкам"
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              error={inputHasError}
              onFocus={onFocusHandler}
              ref={inputRef}
              reset={reset}
              iconLeft={
                <IconSearch
                  size="16px"
                  color={'#ADBFDF'}
                />
              }
              iconRight={
                (isFocused || value) && (
                  <IconClose
                    size="24px"
                    color={'#ADBFDF'}
                  />
                )
              }
            />
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
            <DropDown<IListItem>
              items={typesListItems}
              onClickItem={onTypeItemClickHandler}
              selectedItem={typeFilter}
              filtered={typeFilter.isFilter}
            />
            <DropDown<IListItem>
              items={personListItems}
              onClickItem={onClickHandler}
              selectedItem={personListItems[0]}
              filtered={false}
            />
            <DropDown<IListItem>
              items={numberListItems}
              onClickItem={onClickHandler}
              selectedItem={numberListItems[0]}
              filtered={false}
            />
            <DropDown<IListItem>
              items={sourceListItems}
              onClickItem={onClickHandler}
              selectedItem={sourceListItems[0]}
              filtered={false}
            />
            <DropDown<IListItem>
              items={ErrorListItems}
              onClickItem={onClickHandler}
              selectedItem={ErrorListItems[0]}
              filtered={false}
            />
            <ErrorsDropdown />
          </div>
        </div>
      </div>
      <div className={classes['table-container']}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div>ошибка запроса</div>
        ) : (
          <CallsTable groupedCallsObj={groupedCallsObj} />
        )}
      </div>
    </>
  );
};
export default CallsContainer;
