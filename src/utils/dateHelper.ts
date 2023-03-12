import { subDays } from 'date-fns';
export const setDaysBeforeCurrentDate = (days: number) => subDays(new Date(), days).toISOString();
