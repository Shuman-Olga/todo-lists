import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
/**
 * Функция установки активного стиля в класс для блока задачи
 * @param {boolean} status - статус задачи
 * @param {string} date - дата выполнения задачи
 * @returns Возвращает активеый класс
 */
export function activeClassName(status, date) {
  let className = ' ';
  if (dayjs().isSameOrBefore(dayjs(date), 'day')) {
    switch (status) {
      case false:
        className += 'activeclass-status-in-work';
        break;
      case true:
        className += 'activeclass-status-completed';
        break;
      default:
    }
  } else {
    switch (status) {
      case false:
        className += 'activeclass-status-not-completed';
        break;
      case true:
        className += 'activeclass-status-completed';
        break;

      default:
    }
  }

  return className;
}
