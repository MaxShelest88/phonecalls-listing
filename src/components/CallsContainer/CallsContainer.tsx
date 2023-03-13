import { useEffect, useMemo, useRef } from 'react';
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
  const callsListItems: IListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const sourcesListItems: IListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const ratingListItems: IListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const errorsListItems: IListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);

  const { data: calls, isLoading, error } = callApi.useFetchAllCallsQuery('');
  const { startDate, endDate, name } = useAppSelector((store) => store.filterReducer.dateValue);
  const filtered = useAppSelector((store) => store.filterReducer.filtered);
  const isFilter = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const [count, onArrowClickHandler] = useCount(datePikerListItems);
  const typeFilter = useAppSelector((store) => store.filterReducer.typeValue);
  const groupedCallsObj = useCalls(
    calls?.results || [],
    startDate || '',
    endDate || '',
    typeFilter.value,
  );

  useEffect(() => {
    if (isFilter.current)
      dispatch(
        setDate({
          startDate: subDays(new Date(), datePikerListItems[count].value).toString(),
          name: datePikerListItems[count].name,
        } as IDate),
      );
    isFilter.current = true;
  }, [count, datePikerListItems, dispatch]);

  const onTypeItemClickHandler = (name: string, value: number) => {
    const typeValue = {
      value,
      name,
    } as IType;
    dispatch(setType(typeValue));
	};
	
	const onResetHandler = () => {
		dispatch(resetFilters())
		isFilter.current = false;
	}

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
              endDate={new Date(endDate)}
              startDate={new Date(startDate)}
              calls={calls?.results || []}
              selectedValue={name}
              onArrowClickHandler={onArrowClickHandler}
            />
          )}
        </div>
        <div className={classes['filers-block']}>
          <div className={classes.search}></div>
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
            />
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
