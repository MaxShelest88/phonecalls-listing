import {useEffect, useMemo } from 'react';
import CallsTable from '../CallsTable/CallsTable';
import Loading from '../Loading/Loading';
import classes from './CallsContainer.module.scss';
import DatepickerComponent from '../DatepickerComponent/DatepickerComponent';
import { IDatepickerComponentListItem } from '../../models/IDatepicker';
import { useCalls } from '../../hooks/useCalls';
import IconAdd from '../UI/Icons/IconAdd';
import DropDown from '../Dropdown/DropDown';
import { callApi } from '../../services/CallService';
import { useCount } from '../../hooks/useCount';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setDate } from '../../store/reducers/filter/filterSlice';
import { subDays } from 'date-fns';
import { IDate } from '../../store/reducers/filter/types';

const CallsContainer = () => {
  const datePikerListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const typesListItems = useMemo(() => {
    return [
      { type: 0, name: 'Исходящие' },
      { type: 1, name: 'Входищие' },
    ];
  }, []);
  const callsListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const sourcesListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const ratingListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);
  const errorsListItems: IDatepickerComponentListItem[] = useMemo(() => {
    return [
      { value: 2, name: '3 дня' },
      { value: 6, name: 'Неделя' },
      { value: 30, name: 'Месяц' },
      { value: 364, name: 'Год' },
    ];
  }, []);

  const { data: calls, isLoading, error } = callApi.useFetchAllCallsQuery('');
  const { startDate, endDate, name } = useAppSelector((store) => store.filterReducer.dateValue);
  const dispatch = useAppDispatch();
  const [count, onArrowClickHandler] = useCount(datePikerListItems);
  const groupedCallsObj = useCalls(calls?.results || [], startDate || '', endDate || '');

  useEffect(() => {
    dispatch(
      setDate({
        startDate: subDays(new Date(), datePikerListItems[count].value).toString(),
        name: datePikerListItems[count].name,
      } as IDate),
    );
  }, [count, datePikerListItems, dispatch]);

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
            <DropDown
              items={typesListItems}
              initalValue={'Все типы'}
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
