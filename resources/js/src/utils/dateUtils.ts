import { format as formatDateFn, parse as parseDateFn } from 'date-fns';
import { enUS } from 'date-fns/locale';

export type DateFormat = 'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd/MM/yyyy';
export const formatDate = (date: Date): string => {
  try {
    if (date) {
      const dateObj = new Date(date);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}.${month}.${year}`;
    } else {
      return `-`;
    }
  } catch (error) {
    return '';
  }
};

export const parseDate = (
  dateString: string,
  format: DateFormat
): Date | null => {
  try {
    return parseDateFn(dateString, format, new Date(), { locale: enUS });
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};
